const axios = require("axios");

const api = axios.create({ baseURL: "http://localhost:3000/api/" });

const handleError = (error) => {
    throw error;
};

const apiFetch = (fetchParams, method) => {
    const { data, params, url } = fetchParams;

    return api({
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method,
        params,
        url,
    }).catch(handleError);
};

export function apiGet(params) {
    return apiFetch(params, "get");
}

export function apiPost(params) {
    return apiFetch(params, "post");
}
