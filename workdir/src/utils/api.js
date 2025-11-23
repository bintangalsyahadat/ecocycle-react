import axios from "axios";
import { generateApiJwt } from "./jwt";
import { data } from "react-router-dom";

const token = generateApiJwt();
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchUser = async (user) => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/res/user/${user.uid}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    return axios.request(config)
        .then((response) => {
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const createUser =async (user) => {
    const config = {
        method: 'post',
        url: `${API_BASE_URL}/res/user/create`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: {
            firebase_uuid: user.uid,
            name: user.displayName,
            email: user.email,
        },
    }
    
    return axios.request(config)
        .then((response) => {
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const fetchOperatingUnits = async () => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/res/operating-units`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    return axios.request(config)
        .then((response) => {
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const updateUserOperatingUnit = async (user, operating_unit) => {
    const config = {
        method: 'put',
        url: `${API_BASE_URL}/res/user/${user?.id}`,
        data: {
            current_ou_id: operating_unit?.id,
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    return axios.request(config)
        .then((response) => {
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const fetchCategories = async () => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/res/categories`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    return axios.request(config)
        .then((response) => {
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const fetchDeliveryMethod = async (id = null, type = null) => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/res/delivery-method`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    return axios.request(config)
        .then((response) => {
            return response.data.result.filter(item => (type ? item.type == type : true) && (id ? item.id == id : true));
        })
        .catch((error) => {
            console.log(error);
        });
}


export const createPurchaseTransaction = async (data) => {
    const config = {
        method: 'post',
        url: `${API_BASE_URL}/purchase/create`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    return axios.request(config)
        .then((response) => {
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const fetchPurchaseTransacton = async (id, userId) => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/purchase/${userId}/${id}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    return axios.request(config)
        .then((response) => {
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        });
}