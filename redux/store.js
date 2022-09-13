import taskReducer from "./tasks/components/task.reducer";
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
    })
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };
