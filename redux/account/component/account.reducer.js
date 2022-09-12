import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    name: {
        first: "",
        last: "CRIMSON",
    },
    profilePhoto: null,
    roundedPanelCorners: true,
};

export const getAsyncAccountData = createAsyncThunk("get-account-data", async () => {
    try {
        const data = await AsyncStorage.getItem("crim-task-data");
        if (data) {
            return { data: await JSON.parse(data).account };
        } else return { data: initialState };
    } catch (error) {
        return initialState;
    }
});

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
    extraReducers(builder) {
        builder.addCase(getAsyncAccountData.fulfilled, (state, action) =>
            Object.assign(state, action.payload.data)
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
