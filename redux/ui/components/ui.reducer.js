import { createSlice } from "@reduxjs/toolkit";

const uiReducer = createSlice({
    name: "ui",
    initialState: { side_panel_opened: false },
    reducers: {
        openSide(state) {
            state.side_panel_opened = true;
        },
        closeSide(state) {
            state.side_panel_opened = false;
        },
    },
});

export const { openSide, closeSide } = uiReducer.actions;
export default uiReducer.reducer;

openSide();
