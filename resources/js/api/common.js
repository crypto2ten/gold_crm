import axios from "axios";

import { API_URL } from "../constants/";

const authHeader = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
};

const commonApi = {
    getCustomers: () =>
        axios.get(`${API_URL}/customer`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),

    addCustomer: (data) =>
        axios.post(
            `${API_URL}/customer`,
            {
                data
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),

    editCustomer: (id, data) =>
        axios.put(
            `${API_URL}/customer/${id}`,
            {
                data
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),

    deleteCustomer: (id) =>
        axios.delete(`${API_URL}/customer/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),

    getUsers: () =>
        axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),

    updateAccountStatus: (id, disabled) =>
        axios.put(
            `${API_URL}/users/${id}`,
            {
                disabled,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),
};

export default commonApi;
