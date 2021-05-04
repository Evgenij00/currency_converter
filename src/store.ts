import { combineReducers, createStore } from 'redux'
import {converterReducer, currencyRatesReducer} from './reducers'

const rootReducer = combineReducers({
  currencyRatesReducer,
  converterReducer,
})

const store = createStore(rootReducer)

// store.subscribe(() => {
//   console.log('Store update!', store.getState())
// })

export default store
