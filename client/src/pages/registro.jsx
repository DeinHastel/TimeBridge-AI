import * as React from 'react'
import { useEffect, useState } from "react"
import { InsertarUsuario } from '../api/registrados.api'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/userServices.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
export function RegistroUsuario() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(isLoading)return;
            
        setIsLoading(true);
        setErrorMessage('');
        try{
            const data = await registerUser(formData);
            toast.success("Usuario registrado exitosamente!", {
                onClose: () => navigate('/login'), // Redirige cuando el toast se cierre
                autoClose: 1000,
                position: "top-center", // Tiempo en milisegundos antes de que el toast se cierre automáticamente
            });
            console.log("success", data)
        }
        catch(error){
            if (error.email) {
                toast.error('Error con el correo del usuario ',{
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });        
            setErrorMessage("Error con el correo ");
            }
            if (error.username) {
                toast.error('Error con el nombre del usuario',{
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            setErrorMessage("Error con el nombre de usuario ");
            }
            if (error.non_field_errors) {
                toast.error('Error con la contraseña del usuario',{
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            setErrorMessage("Error con la contraseña ");
            }
            else (error)=> {
            setErrorMessage("Error desconocido: " + error);
            }
            console.error("Error al registrarse", error)
        } finally {
            setIsLoading(false);
        }
    };
    return(
        <div className='bg-black px-10 py-20 rounded-3xl border-2 border-black text-white' >
            <h1 className='text-5xl font-semibold text-purple-700'>Registro de Usuario</h1>
            <p className='font-medium text-lg text-white mt-4'>Ingrese los datos requeridos.</p>
            <form className='mt-8 text-white'>
                <div>
                    <label className='text-xl font-medium'>Nombre</label>
                    <input
                    type="text"
                    name="username"
                    id='username' 
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Ingresa tu Nombre'
                    className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-white text-xl' />
                </div>
                <div>
                    <label className='text-xl font-medium'>Correo</label>
                    <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Ingresa tu correo' 
                    className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-white text-xl' />
                </div>
                <div>
                    <label className='text-xl font-medium'>Contraseña</label>
                    <input
                    type="password"
                    name='password1'
                    id='password1'
                    value={formData.password1}
                    onChange={handleChange}
                    placeholder='Ingresa tu contraseña' 
                    className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-xl'/>
                </div>
                <div>
                    <label className='  text-xl font-medium'>Confirmar Contraseña</label>
                    <input
                    type="password"
                    name='password2'
                    id='password2'
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder='Confirma tu contraseña' 
                    className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-xl'/>
                </div>
                
                {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input  
                            type='checkbox'
                            id='recuerdame'
                        />
                        <label className='lg:text-xl ml-2 font-medium text-base' htmlFor="recuerdame">Recuerdame</label>
                    </div>
                    <button className='lg:text-xl font-medium text-base text-purple-700'>Olvide mi contraseña</button>
                </div>
                <div className='text-align-center mt-4 flex justify-items-center'>
                    <p class=' text-xl'>¿ya tienes un usuario?</p>
                    <button onClick={() => { navigate('/login'); }} className='pl-5 font-medium text-xl text-purple-700'>   inicia sesion aqui</button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                <button
                type='submit'
                disabled = {isLoading}
                onClick={handleSubmit}
                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-purple-700 text-black text-lg font-bold'>Ingresar
                </button>
                </div>
                <ToastContainer />
            </form>
        </div>
    )

}