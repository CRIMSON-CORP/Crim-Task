import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
// import { SET_INITIAL_STATE } from "../redux/tasks/components/task.actions";
import { setInitialState } from "../redux/tasks/components/task.reducer";
import { setInitialState as setAccountInitialState } from "../redux/account/account.reducer";
export function debounce(func, delay = 500) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, delay);
    };
}

// export async function getAsyncTaskData() {
//     try {
//         let data = await AsyncStorage.getItem("crim-task-data");
//         if (data) {
//             setInitialState({ data: await JSON.parse(data).tasks });
//             // return store.dispatch({
//             //     type: SET_INITIAL_STATE,
//             //     payload: {

//             //     },
//             // });
//         } else throw "";
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }
// export async function getAsyncUIData() {
//     try {
//         const data = await AsyncStorage.getItem("crim-task-data");
//         if (data) {
//             // return store.dispatch({
//             //     type: SET_UI_INITIAL_STATE,
//             //     payload: {
//             //         data: await JSON.parse(data).ui,
//             //     },
//             // });
//         } else {
//             throw "";
//         }
//     } catch (error) {
//         return {
//             side_panel_opened: false,
//         };
//     }
// }
// export async function getAsyncAccountData() {
//     try {
//         const data = await AsyncStorage.getItem("crim-task-data");
//         if (data) {
//             setAccountInitialState({ data: await JSON.parse(data).account });
//             // return store.dispatch({
//             //     type: SET_ACCOUNT_INITIAL_STATE,
//             //     payload: {
//             //         ,
//             //     },
//             // });
//         }
//         throw "";
//     } catch (error) {
//         return {
//             name: {
//                 first: "",
//                 last: "",
//             },
//             roundedPanelCorners: true,
//         };
//     }
// }

export function ClearStore() {
    store.dispatch({ type: "CLEAR_ALL_DATA" });
}

export const TopBarSharedElements = [
    { id: "item.menu", animation: "fade" },
    { id: "item.back", animation: "fade" },
    { id: "item.search" },
    { id: "item.bell" },
];
