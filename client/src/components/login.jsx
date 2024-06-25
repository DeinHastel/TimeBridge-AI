import '../normal.css'
import '../App.css';
import * as React from 'react'
import {useForm} from "react-hook-form"
import { Link,   useHref,   useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { dataDecrypt } from "../utils/data-decrypt"
import { ObtenerUsuarios } from '../api/registrados.api'
 
export function LoginUsuario() {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    // Función para cargar los usuarios
    useEffect(() => {
    async function loadTasks() {
      const res = await ObtenerUsuarios();
      const datos = res.data;
      setUserData(datos);

    }

    loadTasks();
  }, []);

  // funcion de envio de datos al dar click en el boton de enviar
  const onSubmit= handleSubmit(async data =>{
        
    // Verificar si los datos del formulario están en los datos cargados
    const userExists = userData.some(user => {
        // estos eran pruebas para que vea como se traen los datos
        // console.log("Comparando con el usuario:", user.email);
        // console.log("Comparando con el contraseña:", dataDecrypt(user.contraseña_actual));
        // console.log("Comparando con el contraseña form:", data.contraseña_actual);
        return user.email === data.email && dataDecrypt(user.contraseña_actual) === data.contraseña_actual;
    });

    
    if (userExists) {
        console.log("Usuario válido");
        // Realizar acciones cuando el usuario es válido
        navigate('/timebridge')
    } else {
        console.log("Usuario no válido");
        alert("usuario o contraseña invalida")
        // Realizar acciones cuando el usuario no es válido
    }
})
    return(
        <div className='bg-black px-10 py-20 rounded-3xl border-2 border-purple-700 text-white' >
            <h1 className='text-5xl font-semibold text-purple-700'>Inicio TimeBridge</h1>
            <p className='font-medium text-lg text-white mt-4'>ingrese datos de usuario.</p>
            <form onSubmit={onSubmit} className='mt-8 text-white '>
                <div>
                    <label className='text-xl text-lg font-medium'>Correo</label>
                    <input {...register("email", {required:true})} className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-white text-xl' type="email" placeholder='Ingresa tu correo' name='email' id='email'/>
                </div>
                <div>
                <label className=' text-xl text-lg font-medium'>Contraseña</label>
                    <input {...register("contraseña_actual", {required:true})} className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-xl' type="password" placeholder='Ingresa tu contraseña' name='contraseña_actual' id='contraseña_actual'/>
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input
                            type='checkbox'
                            id='recuerdame'
                        />
                        <label className='text-xl ml-2 font-medium text-base' htmlFor="recuerdame">Recuerdame</label>
                    </div>
                    <button className='text-xl font-medium text-base text-purple-700'>Olvide mi contraseña</button>
                </div>
                <div className=' mt-6 flex justify-items-center'>
                    <p class='text-xl text-align-center'>¿nuevo usuario?</p>
                    <button onClick={() => { window.location.href = '/registrate'; }} className='text-xl font-medium text-base text-purple-700'>registrate aqui</button>
                </div>
                {/* <Link to='/timebridge'> */}
                    <div className='text-xl mt-8 flex flex-col gap-y-4'>
                <button className='text-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-purple-700 text-black text-lg font-bold' type='submit'>Ingresar</button>
                </div>
                {/* </Link> */}
            </form>
        
        </div>
    )

}