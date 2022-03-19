const account = {
    name: {
        first: "Chrstiana",
        last: "Atinuke",
    },
    profilePhoto: require("../../../assets/crim-task/profile.png"),
};
function accountReducer(state = account, ACTION) {
    switch (ACTION.type) {
        default:
            return state;
    }
}
export default accountReducer;
