import axios from 'axios'

const UsuarioApi = axios.create({
    baseURL: 'http://localhost:8000/usuario/pagina/v1/usuario/'
})

export const ObtenerUsuarios = () => UsuarioApi.get('/')
export const InsertarUsuario = (usuario) =>  UsuarioApi.post('/', usuario)
