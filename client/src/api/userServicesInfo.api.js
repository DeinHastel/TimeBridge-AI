import axiosInstance from './axiosConfig.api';

export const infoUser = async (userData) => {
    try {
        const response = await axiosInstance.get('/userinfo/', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al Iniciar obtener la informacion";
    }
};