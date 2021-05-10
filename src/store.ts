/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  archiveRatesReducer,
  avialableCurrenciesReducer,
  converterReducer,
  currencyRatesReducer,
} from "./reducers";

const rootReducer = combineReducers({
  archiveRatesReducer,
  avialableCurrenciesReducer,
  converterReducer,
  currencyRatesReducer,
});

type TRootReducer = typeof rootReducer;
export type TAppState = ReturnType<TRootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
