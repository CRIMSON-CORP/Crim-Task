import { createStore, combineReducers } from "redux";
import taskReducer from "./tasks/components/task.reducer";
const reducers = combineReducers({ taskReducer });
const store = createStore(reducers);
export default store;
