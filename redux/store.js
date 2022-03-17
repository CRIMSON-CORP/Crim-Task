import { createStore, combineReducers } from "redux";
import taskReducer from "./tasks/components/task.reducer";
import uiReducer from "./ui/components/ui.reducer";
const combinedReducers = combineReducers({ taskReducer, uiReducer });
const store = createStore(combinedReducers);
export default store;
