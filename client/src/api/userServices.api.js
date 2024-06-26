import axiosInstance from './axiosConfig.api';

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/registro/', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al registrarse";
    }
};

