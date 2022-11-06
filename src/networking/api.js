import { setLoading, setLogin, setError, reset,setGlobal } from "context";
import axios from "./interceptor";

const baseUrl = "http://127.0.0.1:5000/"


const login = async (dispatch, emailId, passwords) => {
    setLoading(dispatch, true);
    try {
        const resp = await axios.post(`${baseUrl}login`, {
            email: emailId,
            password: passwords
        });
        const data = await resp.data;
        if (data.success) {
            localStorage.setItem("token", data.message);
            setLogin(dispatch, data);
        }
        else {
            setError(dispatch, data.message);
        }
    }
    catch (error) {
        setError(dispatch, error.message);
    }
    finally {
        setLoading(dispatch, false);
    }

}


const register = async (dispatch, username, emailId, passwords) => {
    setLoading(dispatch, true);
    try {
        const resp = await axios.post(`${baseUrl}create`, {
            email: emailId,
            password: passwords,
            name: username
        });
        const data = await resp.data;
        if (data.success) {
            setGlobal(dispatch, data);
        }
        else {
            setError(dispatch, data.message);
        }
    }
    catch (error) {
        setGlobal(dispatch, {success: false, message: error.message});
        setError(dispatch, error.message);
    }
    finally {
        setLoading(dispatch, false);
    }
}

export { login, register };