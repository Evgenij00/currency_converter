import axios from "axios";

export interface ICurrencyService {
  getCurrentDate: () => string
  getResource: (url: string) => Promise<any>
  getLatestByBase: (base: string) => Promise<any>
  getLatestByBaseRandom: (base: string) => Promise<any>
  getConvertPrice: (base: string, target: string, amount: string, date: string) => Promise<number>
  getArchiveByBase: (base: string, data: string) => Promise<[string, number][]>
  getCurrencies: () => Promise<[string, string][]>
  _simulateUpdateCurrenciesRates: (rates: [string, number][]) => [string, number][]
  _getRandomDifference: (price: number) => number 
}

export default class CurrencyService implements ICurrencyService {

  private _apiBase = 'https://api.frankfurter.app';
  private _currentDate = new Date().toLocaleDateString('en-CA')

  getCurrentDate = (): string => {
    return this._currentDate
  }

  getResource = async (url: string): Promise<any> => {
    const result = await axios.get(`${this._apiBase}${url}`);
    return result.data
  }

  getLatestByBase = async (base: string): Promise<any> => {
    const result = await this.getResource(`/latest?from=${base}`)
    result.rates[base] = 1 //необходимо добавить базу в список валют, чтобы кооректно отработал селектор валют
    return {
      base: result.base,
      rates: Object.entries(result.rates)
    }
  }

  getLatestByBaseRandom = async (base: string): Promise<any> => {
    const result = await this.getLatestByBase(base)
    const result2 = {
      rates: this._simulateUpdateCurrenciesRates(result.rates),
      base: result.base
    }
    console.log(result2)
    return result2
  }

  getConvertPrice = async (base: string, target: string, amount: string, date: string): Promise<number> => {
    const result = await this.getResource(`/${date}?amount=${amount}&from=${base}&to=${target}`)
    return result.rates[target]
  }

  getArchiveByBase = async (base: string, data: string): Promise<[string, number][]> => {
    const result = await this.getResource(`/${data}?from=${base}`)
    result.rates[base] = 1 //необходимо добавить базу в список валют, чтобы кооректно отработал селектор валют
    return Object.entries(result.rates)
  }

  getCurrencies = async (): Promise<[string, string][]> => {
    const result = await this.getResource('/currencies')
    console.log(result)
    return Object.entries(result)
  }

  //Позволяет сымитировать обновление курсов валют
  _simulateUpdateCurrenciesRates = (rates: [string, number][]): [string, number][] => {
    return rates.map((item: [string, number]) => {
      const diff = this._getRandomDifference(item[1])
      item[0] = item[0] + '/' + diff
      item[1] = +(item[1] + diff).toFixed(5)
      return item
    })
  }

  //Получем мнимую разницу старого курса и нового
  _getRandomDifference = (price: number): number => {
    return (-0.001 + Math.random() * (0.001 + 0.001)) * price
  }
}
