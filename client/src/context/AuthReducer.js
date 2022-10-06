const setItem = (payload) => {
    window.localStorage.setItem("AuthStore", JSON.stringify(payload))
}

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "RESTING_STATE":
            setItem({
                user: state.user,
                isFetching: false,
                error: false
            });

            return {
                user: state.user,
                isFetching: false,
                error: false
            }
        case "LOGIN_START":
            setItem({
                user: null,
                isFetching: true,
                error: false
            })

            return {
                user: null,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            setItem({
                user: action.payload,
                isFetching: false,
                error: false
            })

            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            setItem({
                user: null,
                isFetching: false,
                error: action.payload
            })

            return {
                user: null,
                isFetching: false,
                error: action.payload
            }
        case "FOLLOW":
            setItem({
                ...state,
                user: {
                    ...state.user,
                    following: [...state.user.following, action.payload]
                }
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    following: [...state.user.following, action.payload]
                }
            }
        case "UNFOLLOW":
            setItem({
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter((user) => user !== action.payload)
                }
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter((user) => user !== action.payload)
                }
            }
        default:
            setItem(state)
            return state
    }
}

export default AuthReducer;