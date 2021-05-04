import { combineReducers, createStore } from 'redux'
import {converterReducer, currencyRatesReducer, archiveReducer, avialableReducer} from './reducers'

const rootReducer = combineReducers({
  currencyRatesReducer,
  converterReducer,
  archiveReducer,
  avialableReducer,
})

const store = createStore(rootReducer)

// store.subscribe(() => {
//   console.log('Store update!', store.getState())
// })

export default store
