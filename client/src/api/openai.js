import axios from 'axios';
import { apikey } from '../constantes/apikey';

// Cambia la URL de la API a la de tu backend

const apiUrl = 'http://localhost:8000/conversacion/pagina/v1/conversacion/';
const apiUrlopenai = 'https://api.openai.com/v1/completions';


export async function sendMsgToOpenAI(message) {
  try {
    // Configura la solicitud a la API de OpenAI
    const requestData = {
      model: 'gpt-3.5-turbo-instruct',
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    // Realiza la solicitud a la API de OpenAI usando Axios
    console.log(requestData)
    const response = await axios.post(apiUrlopenai, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`,
      },
    });

    // Devuelve el texto generado
    console.log(response.data)
    return response.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      
      console.error('Error al realizar la solicitud a la API de OpenAI:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta de la API de OpenAI:', error.request);
    } else {
      console.error('Error al realizar la solicitud a la API de OpenAI:', error.message);
    }
    throw new Error('Error al procesar la solicitud a OpenAI');
  }
}

export async function sendMsgToBackend(chatId, message) {
  try {
    // Configura la solicitud a tu backend
    const requestData = {
      chat_id: chatId,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    };

    // Realiza la solicitud a tu backend usando Axios
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Devuelve el texto generado por el bot
    return sendMsgToOpenAI(message)

  } catch (error) {
    if (error.response) {
      console.error('Error al realizar la solicitud a tu backend:', response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta de tu backend:', error.request);
    } else {
      console.error('Error al realizar la solicitud a tu backend:', error.message);
    }
    throw new Error('Error al procesar la solicitud a tu backend');
  }
  
}
