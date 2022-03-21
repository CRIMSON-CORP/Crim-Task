import * as ACTIONS from "./ui.actions";
const ui = {
    view: "lists",
    side_panel_opened: false,
    navigation_ref: null,
};
function uiReducer(state = ui, ACTION) {
    switch (ACTION.type) {
        case ACTIONS.SET_PANEL_VIEW:
            return { ...state, view: ACTION.payload.view, side_panel_opened: false };
        case ACTIONS.OPEN_SIDE:
            return { ...state, side_panel_opened: true };
        case ACTIONS.CLOSE_SIDE:
            return { ...state, side_panel_opened: false };
        case ACTIONS.SET_NAVIGATION_REF:
            return { ...state, navigation_ref: ACTION.payload.navigation_ref };
        default:
            return state;
    }
}
export default uiReducer;
