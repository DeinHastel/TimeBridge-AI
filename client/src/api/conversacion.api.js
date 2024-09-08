import axios from 'axios';

const conversacionApi = axios.create({
    baseURL: 'http://localhost:8000/conversacion/pagina/v1/conversacion/'
});

export const getConversacion = (chatId) => {
    const url = chatId ? `/?chat_id=${chatId}` : '/';
    return conversacionApi.get(url);
};

