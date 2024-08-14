import axiosInstance from './axiosConfig.api';

export const logoutUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/logout/', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error al cerrar sesión";
    }
};