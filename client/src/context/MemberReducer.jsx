const MemberReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                memberUser: action.payload,
            };
        }
        case "LOGOUT": {
            return {
                memberUser: null,
            };
        }
        default:
            return state;
    }
};

export default MemberReducer;