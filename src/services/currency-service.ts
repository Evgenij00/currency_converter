export interface ICurrencyService {
  getLatestFrom: (base: string) => Promise<any>
  getLatestFromTo: (base: string, target: string, amount: string, date: string) => Promise<number>
  getHistoryFrom: (base: string, data: string) => Promise<[string, number][]>
  getCurrencies: () => Promise<[string, string][]>
}

export default class CurrencyService implements ICurrencyService {

  _apiBase = 'https://api.frankfurter.app';

  getResource = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`);
    return await res.json();
  }

  getLatestFrom = async (base: string): Promise<any> => {
    const result = await this.getResource(`/latest?from=${base}`)
    result.rates[base] = 1
    const rates = Object.entries(result.rates)
    return {
      base: result.base,
      rates
    }
  }

  getLatestFromTo = async (base: string, target: string, amount: string, date: string): Promise<number> => {
    const result = await this.getResource(`/${date}?amount=${amount}&from=${base}&to=${target}`)
    return result.rates[target]
  }

  getHistoryFrom = async (base: string, data: string): Promise<[string, number][]> => {
    const result = await this.getResource(`/${data}?from=${base}`)
    result.rates[base] = 1
    return Object.entries(result.rates)
  }

  getCurrencies = async (): Promise<[string, string][]> => {
    const result = await this.getResource('/currencies')
    console.log(result)
    return Object.entries(result)
  }
}
