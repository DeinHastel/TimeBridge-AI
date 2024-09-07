import axios from 'axios'

const ChatsApi = axios.create({
    baseURL: 'http://localhost:8000/chats/pagina/v1/chats/'
})

export const getChats = (filter) => {
    const url = filter ? `/?filter=${filter}` : '/';
    return ChatsApi.get(url);
}

export const Insertarchats = (chats) =>  ChatsApi.post('/', chats)

export const deleteChat = (id) => ChatsApi.delete(`/${id}`);

export const updateChat = (id, data) => ChatsApi.patch(`/${id}/`, data);