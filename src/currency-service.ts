import axios from "axios";

export type TService = {
  service: ICurrencyService;
};

export type TCurrency = [string, string];
export type TRate = [string, number];

export type TBaseAndRates = {
  base: string;
  rates: TRate[];
};

export type TArchiveRates = {
  base: string;
  date: string;
  rates: TRate[];
};

export interface ICurrencyService {
  getLatestRates: (from: string) => Promise<TBaseAndRates>;
  getArchiveRates: (data: string, from: string) => Promise<TArchiveRates>;
  getConvertPrice: (
    base: string,
    target: string,
    amount: string,
    date: string
  ) => Promise<number>;
  getCurrencies: () => Promise<TCurrency[]>;
  getLatestByBaseRandom: (base: string) => Promise<TBaseAndRates>;
}

export default class CurrencyService implements ICurrencyService {
  private instance = axios.create({
    baseURL: "https://api.frankfurter.app",
  });

  getLatestRates = async (from: string): Promise<TBaseAndRates> => {
    const {
      data: { rates, base },
    } = await this.instance.get<TLatestRatesResponse>(`/latest?from=${from}`);

    rates[base] = 1; // необходимо добавить базу в список валют, чтобы кооректно отработал селектор валют
    return {
      base,
      rates: Object.entries(rates),
    };
  };

  getArchiveRates = async (
    date: string,
    from: string
  ): Promise<TArchiveRates> => {
    const {
      data: { rates, base },
    } = await this.instance.get<TLatestRatesResponse>(`/${date}?from=${from}`);
    rates[base] = 1;
    return {
      base,
      date,
      rates: Object.entries(rates),
    };
  };

  getConvertPrice = async (
    from: string,
    to: string,
    amount: string,
    date: string
  ): Promise<number> => {
    const {
      data: { rates },
    } = await this.instance.get<TLatestRatesResponse>(
      `/${date}?amount=${amount}&from=${from}&to=${to}`
    );
    return rates[to];
  };

  getCurrencies = async (): Promise<TCurrency[]> => {
    const { data } = await this.instance.get<TCurrencies>("/currencies");
    return Object.entries(data);
  };

  getLatestByBaseRandom = async (base: string): Promise<TBaseAndRates> => {
    const result = await this.getLatestRates(base);
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

type TLatestRatesResponse = {
  amount: number;
  base: string;
  date: string;
  rates: TRates;
};

type TRates = {
  [key: string]: number;
};

type TCurrencies = {
  [key: string]: string;
};
