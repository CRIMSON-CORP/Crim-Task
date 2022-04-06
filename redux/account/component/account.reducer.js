import * as ACTIONS from "./account.actions";
const account = {
    name: {
        first: "",
        last: "",
    },
    roundedPanelCorners: true,
};
function accountReducer(state = account, ACTION) {
    switch (ACTION.type) {
        case ACTIONS.SET_ACCOUNT_INITIAL_STATE:
            return {
                ...state,
                ...ACTION.payload.data,
            };
        case ACTIONS.CHANGE_FIRST_NAME:
            return {
                ...state,
                name: {
                    ...state.name,
                    first: ACTION.payload.data,
                },
            };
        case ACTIONS.CHANGE_LAST_NAME:
            return {
                ...state,
                name: {
                    ...state.name,
                    last: ACTION.payload.data,
                },
            };
        case ACTIONS.CHANGE_ROUNDED_CORNER:
            return {
                ...state,
                roundedPanelCorners: ACTION.payload.state,
            };
        case ACTIONS.CHANGE_PROFILE_PHOTO:
            return {
                ...state,
                profilePhoto: ACTION.payload,
            };
        case "CLEAR_ALL_DATA":
            return {};
        default:
            return state;
    }
}
export default accountReducer;
