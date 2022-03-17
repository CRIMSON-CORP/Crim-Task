import { createStore, combineReducers } from "redux";
import taskReducer from "./tasks/components/task.reducer";
const combinedReducers = combineReducers({ taskReducer });
const store = createStore(combinedReducers);
export default store;
