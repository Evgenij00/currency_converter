import { combineReducers, createStore } from "redux";
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

const store = createStore(rootReducer);

export default store;
