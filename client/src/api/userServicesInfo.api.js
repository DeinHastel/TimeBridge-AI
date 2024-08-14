import axiosInstance from './axiosConfig.api';

export const infoUser = async (config) => {
    try {
        const response = await axiosInstance.get('/userinfo/', config);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al Iniciar obtener la informacion";
    }
};