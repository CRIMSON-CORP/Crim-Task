import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    name: {
        first: "",
        last: "",
    },
    profilePhoto: null,
    roundedPanelCorners: true,
};

export const getAsyncAccountData = createAsyncThunk("get-account-data", async () => {
    try {
        const data = await AsyncStorage.getItem("crim-task-data");
        if (data) {
            return await JSON.parse(data).account;
        } else return initialState;
    } catch (error) {
        return initialState;
    }
});

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
        changeProfilePhoto(state, action) {
            state.profilePhoto = action.payload;
        },
        resetAccount: () => initialState,
    },
    extraReducers(builder) {
        builder.addCase(getAsyncAccountData.fulfilled, (state, { payload }) =>
            Object.assign(state, payload)
        );
    },
});

export const {
    setInitialState,
    changeFirstName,
    changeLastName,
    changeProfilePhoto,
    changeRoundedCorners,
} = accountReducer.actions;
export default accountReducer.reducer;
