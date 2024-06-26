import axiosInstance from './axiosConfig.api';

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/login/', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al recibir al iniciar sesion";
    }
};