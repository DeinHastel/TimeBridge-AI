import '../normal.css'
import '../App.css';
import * as React from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { dataDecrypt } from "../utils/data-decrypt"
import { ObtenerUsuarios } from '../api/registrados.api'
import loginService from '../api/login.api'
 
export function LoginUsuario() {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, SetUser] = useState(null);
    const navigate = useNavigate();

    // Función para cargar los usuarios
    useEffect(() => {
    async function loadTasks() {
      const res = await ObtenerUsuarios();
      const datos = res.data;
      setUserData(datos);

    //   console.log("Datos de userData:", datos);

    }

    loadTasks();
  }, []);


  // funcion de envio de datos al dar click en el boton de enviar
  const onSubmit= handleSubmit(async data =>{
        
    // Verificar si los datos del formulario están en los datos cargados
    const userExists = userData.some(user => {
        // estos eran pruebas para que vea como se traen los datos

         console.log("Comparando con el usuario:", user.email);
         console.log("Comparando con el contraseña:", dataDecrypt(user.contraseña_actual));
         console.log("Comparando con el contraseña form:", data.contraseña_actual);
        return user.email === data.email && dataDecrypt(user.contraseña_actual) === data.contraseña_actual;
        
    });

    
    if (userExists) {
        try {
          const response = await loginService.login({
            username: data.email,
            password: data.contraseña_actual,
          });

          SetUser(response);
          username = data.email
          password = data.contraseña_actual
          setUsername('')
          setPassword('')
          navigate('/timebridge');
        } catch (error) {
          console.error(error);
          // Handle login error
        }
      } else {
        console.error('Usuario o contraseña invalidos');
       
      }
})
    return(
        <div className='bg-black px-10 py-20 rounded-3xl border-2 border-purple-700 text-white' >
            <h1 className='text-5xl font-semibold text-purple-700'>Bienvenido</h1>
            <p className='font-medium text-lg text-white mt-4'>Porfavor ingresa tus datos.</p>
            <form onSubmit={onSubmit} className='mt-8 text-white'>
                <div>
                    <label className='text-lg font-medium'>Correo</label>
                    <input {...register("email", {required:true})} className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-white' type="text" placeholder='Ingresa tu correo' name='email' id='email'/>
                </div>
                <div>
                <label className='text-lg font-medium'>Contraseña</label>
                    <input {...register("contraseña_actual", {required:true})} className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent' type="password" placeholder='Ingresa tu contraseña' name='contraseña_actual' id='contraseña_actual'/>
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input
                            type='checkbox'
                            id='recuerdame'
                        />
                        <label className='ml-2 font-medium text-base' htmlFor="recuerdame">Recuerdame</label>
                    </div>
                    <button className='font-medium text-base text-purple-700'>Olvide mi contraseña</button>
                </div>
                {/* <Link to='/timebridge'> */}
                    <div className='mt-8 flex flex-col gap-y-4'>
                <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-purple-700 text-black text-lg font-bold' type='submit'>Ingresar</button>
                </div>
                {/* </Link> */}
            </form>
        
        </div>
    )

}