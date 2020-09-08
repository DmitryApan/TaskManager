const initialState = {
    authorization: {
        isFetching: false,
        isLogin: false,
        error: ''
    },
    userInfo: {
        isFetching: false,
        data: {}
    },
    usersApp: {
        isFetching: false,
        data: []
    },
    statuses: {
        isFetching: false,
        data: []
    },
    cards: {
        isFetching: false,
        data: []
    }
};

export default initialState;