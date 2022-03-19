import { createStore, combineReducers } from "redux";
import taskReducer from "./tasks/components/task.reducer";
import uiReducer from "./ui/components/ui.reducer";
import accountReducer from "./account/component/account.reducer";
const combinedReducers = combineReducers({
    tasks: taskReducer,
    ui: uiReducer,
    account: accountReducer,
});
const store = createStore(combinedReducers);
export default store;
