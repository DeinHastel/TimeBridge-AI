import axios from 'axios';

const UsersApi = axios.create({
    baseURL: 'http://localhost:8000/auth/'  // Ajusta la URL según tu estructura
});


export const updateUserRole = (userId, newRoleId) => {
    return UsersApi.put(`update-role/${userId}/`, { rol: newRoleId });
};
