import * as ACTIONS from "./ui.actions";
const ui = {
    view: "lists",
};
function uiReducer(state = ui, ACTION) {
    switch (ACTION.type) {
        case ACTIONS.SET_PANEL_VIEW:
            return { ...state, view: ACTION.payload.view };
        default:
            return state;
    }
}
export default uiReducer;
