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
    const response = await axios.post(apiUrlopenai, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`,
      },
    });

    // Devuelve el texto generado
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
    // Primero, obtenemos la respuesta de OpenAI
    const openAiResponse = await sendMsgToOpenAI(message);

    // Ahora enviamos el mensaje original y la respuesta de OpenAI al backend
    const requestData = {
      chat_id: chatId,
      messages: [
        {
          role: "user",   // El rol podría ser 'usuario' o 'bot', dependiendo del flujo
          content: message,  // Mensaje original
        },
        {
          role: 'bot',   // Aquí el rol se define como bot para la respuesta de OpenAI
          content: openAiResponse,  // Respuesta generada por OpenAI
        },
      ],
    };

    // Realizamos la solicitud a tu backend
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Devuelve la respuesta de tu backend, si es necesario
    return openAiResponse;

  } catch (error) {
    if (error.response) {
      console.error('Error al realizar la solicitud a tu backend:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta de tu backend:', error.request);
    } else {
      console.error('Error al realizar la solicitud a tu backend:', error.message);
    }
    throw new Error('Error al procesar la solicitud a tu backend');
  }
}
