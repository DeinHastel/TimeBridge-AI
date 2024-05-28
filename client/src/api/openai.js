import axios from 'axios';
import { apikey } from '../constantes/apikey';

// Configura la clave de API
const apiKey = apikey;
const apiUrl = 'https://api.openai.com/v1/completions';

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
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
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
