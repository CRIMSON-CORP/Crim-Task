import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_ACCOUNT_INITIAL_STATE } from "../redux/account/component/account.actions";
import store from "../redux/store";
import { SET_INITIAL_STATE } from "../redux/tasks/components/task.actions";
export function debounce(func, delay = 500) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, delay);
    };
}

export async function getAsyncTaskData() {
    try {
        let data = await AsyncStorage.getItem("crim-task-data");
        if (data) {
            return store.dispatch({
                type: SET_INITIAL_STATE,
                payload: {
                    data: await JSON.parse(data).tasks,
                },
            });
        } else throw "";
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function getAsyncUIData() {
    try {
        const data = await AsyncStorage.getItem("crim-task-data");
        if (data) {
            return store.dispatch({
                type: SET_UI_INITIAL_STATE,
                payload: {
                    data: await JSON.parse(data).ui,
                },
            });
        } else {
            throw "";
        }
    } catch (error) {
        return {
            side_panel_opened: false,
        };
    }
}
export async function getAsyncAccountData() {
    try {
        const data = await AsyncStorage.getItem("crim-task-data");
        if (data) {
            return store.dispatch({
                type: SET_ACCOUNT_INITIAL_STATE,
                payload: {
                    data: await JSON.parse(data).account,
                },
            });
        }
        throw "";
    } catch (error) {
        return {
            name: {
                first: "",
                last: "",
            },
            roundedPanelCorners: true,
        };
    }
}
