import { setLoading, setError, setGlobal } from "context";
import axios from "./interceptor";
import { baseUrl } from "./api";

const getAllInstance = async (dispatch) => {
    setLoading(dispatch, true);
    try {
        const resp = await axios.get(`${baseUrl}admin/getinstance`);
        const data = await resp.data;
        if (data.success) {
            setGlobal(dispatch, {success: true, message: "Instance Updated"});
        }
        else {
            setError(dispatch, data.message);
        }
        return data;
    }
    catch (error) {
        setGlobal(dispatch, {success: false, message: error.message});
        setError(dispatch, error.message);
    }
    finally {
        setLoading(dispatch, false);
    }
    return {success:false, message:"Something Wrong"}
}

const getAllUsers = async (dispatch) => {
    setLoading(dispatch, true);
    try {
        const resp = await axios.get(`${baseUrl}admin/getUsers`);
        const data = await resp.data;
        if (data.success) {
            setGlobal(dispatch, {success: true, message: "Instance Updated"});
        }
        else {
            setError(dispatch, data.message);
        }
        return data;
    }
    catch (error) {
        setGlobal(dispatch, {success: false, message: error.message});
        setError(dispatch, error.message);
    }
    finally {
        setLoading(dispatch, false);
    }
    return {success:false, message:"Something Wrong"}
}

export {getAllInstance,getAllUsers};