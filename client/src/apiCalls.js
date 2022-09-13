import axios from "axios";

export const LoginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        let baseUrl = process.env.REACT_APP_API_URL;
        const res = await axios.post(baseUrl + "auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.Data })
        return true
    } catch (e) {
        if (e.name === "AxiosError") {
            dispatch({ type: "LOGIN_FAILURE", payload: e.response.data })
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: e })
        }
        return false
    }
}

export const RegisterCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        let baseUrl = process.env.REACT_APP_API_URL;
        const res = await axios.post(baseUrl + "auth/register", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.Data });
        console.log(res.data.Data)
        return true
    } catch (e) {
        if (e.name === "AxiosError") {
            dispatch({ type: "LOGIN_FAILURE", payload: e.response.data.messages === undefined ? e.response.data : e.response.data.messages })
            // console.log(e.response.data.messages)
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: e.response.data.messages || e })
        }
        return false
    }
}