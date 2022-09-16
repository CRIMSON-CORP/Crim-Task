import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: {
        first: "",
        last: "",
    },
    userExist: false,
    profilePhoto: null,
    roundedPanelCorners: true,
};

const accountReducer = createSlice({
    name: "account",
    initialState,
    reducers: {
        changeFirstName(state, { payload }) {
            state.name.first = payload;
        },
        changeLastName(state, { payload }) {
            state.name.last = payload;
        },
        changeRoundedCorners(state, { payload }) {
            state.roundedPanelCorners = payload;
        },
        changeProfilePhoto(state, { payload }) {
            state.profilePhoto = payload;
        },
        updateUserExistence(state, { payload }) {
            state.userExist = payload;
        },
        resetAccount: () => initialState,
    },
});

export const {
    resetAccount,
    changeLastName,
    changeFirstName,
    changeProfilePhoto,
    updateUserExistence,
    changeRoundedCorners,
} = accountReducer.actions;
export default accountReducer.reducer;
