// import * as ACTIONS from "./account.actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: {
        first: "",
        last: "",
    },
    profilePhoto: null,
    roundedPanelCorners: true,
};

const accountReducer = createSlice({
    name: "account",
    initialState,
    reducers: {
        setInitialState(state, action) {
            state = action.payload.data;
        },
        changeFirstName(state, action) {
            state.name.first = action.payload.data;
        },
        changeLastName(state, action) {
            state.name.last = action.payload.data;
        },
        changeRoundedCorners(state, action) {
            state.roundedPanelCorners = action.payload.state;
        },
        changeProfilePhoto(state, action) {
            state.profilePhoto = action.payload;
        },
        resetAccount(state) {
            state = {};
        },
    },
});
// function accountReducer(state = account, ACTION) {
//     switch (ACTION.type) {
//         case ACTIONS.SET_ACCOUNT_INITIAL_STATE:
//             return {
//                 ...state,
//                 ...ACTION.payload.data,
//             };
//         case ACTIONS.CHANGE_FIRST_NAME:
//             return {
//                 ...state,
//                 name: {
//                     ...state.name,
//                     first: ACTION.payload.data,
//                 },
//             };
//         case ACTIONS.CHANGE_LAST_NAME:
//             return {
//                 ...state,
//                 name: {
//                     ...state.name,
//                     last: ACTION.payload.data,
//                 },
//             };
//         case ACTIONS.CHANGE_ROUNDED_CORNER:
//             return {
//                 ...state,
//                 roundedPanelCorners: ACTION.payload.state,
//             };
//         case ACTIONS.CHANGE_PROFILE_PHOTO:
//             return {
//                 ...state,
//                 profilePhoto: ACTION.payload,
//             };
//         case "CLEAR_ALL_DATA":
//             return {};
//         default:
//             return state;
//     }
// }
export const {
    setInitialState,
    changeFirstName,
    changeLastName,
    changeProfilePhoto,
    changeRoundedCorners,
} = accountReducer.actions;
export default accountReducer.reducer;
