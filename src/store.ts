import { combineReducers, createStore } from 'redux'
import {converterReducer} from './reducers'

const rootReducer = combineReducers({
  converterReducer,
})

const store = createStore(rootReducer)

// store.subscribe(() => {
//   console.log('Store update!', store.getState())
// })

export default store
