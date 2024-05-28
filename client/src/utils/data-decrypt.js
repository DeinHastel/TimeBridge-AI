import CryptoJS from "crypto-js"
// importacion de la secretKey
import { secretKey } from "../constantes/secret-key"

// aqui se desecnrypta la contraseña
export const dataDecrypt =  (value) =>{
    const bytes = CryptoJS.AES.decrypt(value, secretKey)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}