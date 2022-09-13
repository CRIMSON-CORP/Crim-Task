import taskReducer from "./tasks/components/task.reducer";
import uiReducer from "./ui/components/ui.reducer";
import accountReducer from "./account/account.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CRIM_TASK_STORAGE_KEY } from "../utils/constants";
import { persistStore, persistReducer } from "redux-persist";

const PersistReducerConfig = {
    key: CRIM_TASK_STORAGE_KEY,
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(
    PersistReducerConfig,
    combineReducers({
        account: accountReducer,
        tasks: taskReducer,
        ui: uiReducer,
    })
);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
