import axios from "axios";

export type TService = {
  service: ICurrencyService;
};

export type TBaseAndRates = {
  base: string;
  rates: TRates;
};

export type TRates = [string, number][];

export interface ICurrencyService {
  getCurrentDate: () => string;
  getResource: (url: string) => Promise<any>;
  getLatestByBase: (base: string) => Promise<TBaseAndRates>;
  getLatestByBaseRandom: (base: string) => Promise<TBaseAndRates>;
  getConvertPrice: (
    base: string,
    target: string,
    amount: string,
    date: string
  ) => Promise<number>;
  getArchiveByBase: (base: string, data: string) => Promise<TRates>;
  getCurrencies: () => Promise<[string, string][]>;
}

export default class CurrencyService implements ICurrencyService {
  private apiBase = "https://api.frankfurter.app";

  private currentDate = new Date().toLocaleDateString("en-CA");

  getCurrentDate = (): string => {
    return this.currentDate;
  };

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

  getLatestByBaseRandom = async (base: string): Promise<TBaseAndRates> => {
    const result = await this.getLatestByBase(base);
    return {
      rates: this.simulateUpdateCurrenciesRates(result.rates),
      base: result.base,
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

  getArchiveByBase = async (base: string, date: string): Promise<TRates> => {
    const result = await this.getResource(`/${date}?from=${base}`);
    result.rates[base] = 1; // необходимо добавить базу в список валют, чтобы кооректно отработал селектор валют
    return Object.entries(result.rates);
  };

  getCurrencies = async (): Promise<[string, string][]> => {
    const result = await this.getResource("/currencies");
    return Object.entries(result);
  };

  // Позволяет сымитировать обновление курсов валют
  private simulateUpdateCurrenciesRates = (rates: TRates): TRates => {
    return rates.map((item: [string, number]) => {
      const diff = this.getRandomDifference(item[1]);
      const result = [];
      result[0] = `${item[0]}/${diff}`;
      result[1] = +(item[1] + diff).toFixed(5);
      return item;
    });
  };

  // Получем мнимую разницу старого курса и нового
  private getRandomDifference = (price: number): number => {
    return (-0.001 + Math.random() * (0.001 + 0.001)) * price;
  };
}
