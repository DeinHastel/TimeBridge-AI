import axios from 'axios'

const baseURL = 'http://localhost:8000/usuario/pagina/v1/'



const login = async credentials => {
    const { data } = await axios.post(`${baseURL}/login/`,credentials)
    return data
};



const logout = async () => {
    await axios.post(`${baseURL}/logout/`, {}, { withCredentials: true })
}

const getSession = async () => {
    const { data } = await axios.get(`${baseURL}/session/`, { withCredentials: true })
    return data
}

export default { login, logout, getSession }