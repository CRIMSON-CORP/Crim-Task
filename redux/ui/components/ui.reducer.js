import * as ACTIONS from "./ui.actions";
const ui = {
    view: "lists",
    side_panel_opened: false,
};
function uiReducer(state = ui, ACTION) {
    switch (ACTION.type) {
        case ACTIONS.SET_PANEL_VIEW:
            return { ...state, view: ACTION.payload.view };
        case ACTIONS.OPEN_SIDE:
            return { ...state, side_panel_opened: true };
        case ACTIONS.CLOSE_SIDE:
            return { ...state, side_panel_opened: false };
        default:
            return state;
    }
}
export default uiReducer;
