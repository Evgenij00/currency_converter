import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  converterReducer,
  currencyRatesReducer,
  archiveReducer,
  avialableReducer,
} from "./reducers";

const rootReducer = combineReducers({
  currencyRatesReducer,
  converterReducer,
  archiveReducer,
  avialableReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
