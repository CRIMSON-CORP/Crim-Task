import { createStore, combineReducers } from "redux";
import taskReducer from "./tasks/components/task.reducer";
import uiReducer from "./ui/components/ui.reducer";
import accountReducer from "./account/component/account.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
const combinedReducers = combineReducers({
    tasks: taskReducer,
    ui: uiReducer,
    account: accountReducer,
});
const store = createStore(combinedReducers);

const unsub = store.subscribe(async () => {
    await AsyncStorage.setItem("crim-task-data", JSON.stringify(store.getState()));
});

export default store;
