import taskReducer from "./tasks/components/task.reducer";
import uiReducer from "./ui/components/ui.reducer";
import accountReducer from "./account/account.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        account: accountReducer,
        tasks: taskReducer,
        ui: uiReducer,
    },
});

store.subscribe(async () => {
    await AsyncStorage.setItem("crim-task-data", JSON.stringify(store.getState()));
});

export default store;
