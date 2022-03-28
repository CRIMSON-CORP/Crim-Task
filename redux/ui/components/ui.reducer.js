import * as ACTIONS from "./ui.actions";
const ui = {
    side_panel_opened: false,
};
function uiReducer(state = ui, ACTION) {
    switch (ACTION.type) {
        case ACTIONS.SET_UI_INITIAL_STATE:
            return { ...state, ...ACTION.payload.data };
        case ACTIONS.OPEN_SIDE:
            return { ...state, side_panel_opened: true };
        case ACTIONS.CLOSE_SIDE:
            return { ...state, side_panel_opened: false };
        default:
            return state;
    }
}
export default uiReducer;
