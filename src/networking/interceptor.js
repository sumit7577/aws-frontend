import Axios from 'axios';
import { AuthenticationError, ServerError, NetworkError, ClientError } from './error';

const axios = Axios.create({
    headers: {
        "Content-Type": "application/json",
    }
});

axios.interceptors.request.use(async (request) => {
    console.log("request",request);
    const token = localStorage.getItem("token");
    if (token) {
        request.headers.authorization = `${token}`;
    }

    return request;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("response",error);
        if (error.message === "Network Error") {
            return Promise.reject(new NetworkError(error.message));
        } 
        else if (error.response.status >= 500) {
            return Promise.reject(
                new ServerError(error.response.data.error, error.response.status)
            );
        }
        else if (error.response.status >= 400 && error.response.status < 500) {
            return Promise.reject(
                new ClientError(
                    error.response.data.message,
                    error.response.status
                )
            );
        }

        return Promise.reject({ ...error });
    }
);

export default axios;
