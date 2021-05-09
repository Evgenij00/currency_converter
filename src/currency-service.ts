import axios from "axios";

export type TService = {
  service: ICurrencyService;
};

export type TBaseAndRates = {
  base: string;
  rates: TRate[];
};

export type TFetchArchiveCurrencies = {
  base: string;
  date: string;
  rates: TRate[];
};

export type TCurrency = [string, string];
export type TRate = [string, number];

export interface ICurrencyService {
  getResource: (url: string) => Promise<any>;
  getLatestByBase: (base: string) => Promise<TBaseAndRates>;
  getLatestByBaseRandom: (base: string) => Promise<TBaseAndRates>;
  getConvertPrice: (
    base: string,
    target: string,
    amount: string,
    date: string
  ) => Promise<number>;
  getArchiveByBase: (
    base: string,
    data: string
  ) => Promise<TFetchArchiveCurrencies>;
  getCurrencies: () => Promise<TCurrency[]>;
}

export default class CurrencyService implements ICurrencyService {
  private apiBase = "https://api.frankfurter.app";

  getResource = async (url: string): Promise<any> => {
    const result = await axios.get(`${this.apiBase}${url}`);
    return result.data;
  };

  getLatestByBase = async (base: string): Promise<TBaseAndRates> => {
    const result = await this.getResource(`/latest?from=${base}`);
    result.rates[base] = 1; // необходимо добавить базу в список валют, чтобы кооректно отработал селектор валют
    return {
      base: result.base,
      rates: Object.entries(result.rates),
    };
  };

  getConvertPrice = async (
    base: string,
    target: string,
    amount: string,
    date: string
  ): Promise<number> => {
    const result = await this.getResource(
      `/${date}?amount=${amount}&from=${base}&to=${target}`
    );
    return result.rates[target];
  };

  getArchiveByBase = async (
    base: string,
    date: string
  ): Promise<TFetchArchiveCurrencies> => {
    let { rates } = await this.getResource(`/${date}?from=${base}`);
    rates[base] = 1;
    rates = Object.entries(rates);
    return {
      base,
      date,
      rates,
    };
  };

  getCurrencies = async (): Promise<TCurrency[]> => {
    const result = await this.getResource("/currencies");
    return Object.entries(result);
  };

  getLatestByBaseRandom = async (base: string): Promise<TBaseAndRates> => {
    const result = await this.getLatestByBase(base);
    return {
      rates: this.simulateUpdateCurrenciesRates(result.rates),
      base: result.base,
    };
  };

  // для имитации обновления курсов валют
  private simulateUpdateCurrenciesRates = (rates: TRate[]): TRate[] => {
    return rates.map((item) => {
      const diff = this.getRandomDifference(item[1]);
      const result = [];
      result[0] = `${item[0]}/${diff}`;
      result[1] = +(item[1] + diff).toFixed(5);
      return item;
    });
  };

  // получение мнимой разницы
  private getRandomDifference = (price: number): number => {
    return (-0.001 + Math.random() * (0.001 + 0.001)) * price;
  };
}

export const service = new CurrencyService();
