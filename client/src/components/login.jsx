import '../normal.css'
import '../App.css';
import * as React from 'react'
import {useForm} from "react-hook-form"
import { Link,   useHref,   useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { dataDecrypt } from "../utils/data-decrypt"
import { ObtenerUsuarios } from '../api/registrados.api'
import { login } from '../utils/auth';
 
export function LoginUsuario() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
    const onSubmit = handleSubmit(async data => {
      try {
        const decryptedPassword = dataDecrypt(data.contraseña_actual);


        const response = await login(data.email, decryptedPassword);
        console.log("Login exitoso:", response);
  
        // Redirigir a la página protegida
        navigate('/timebridge');
      } catch (error) {
        console.log("Error en el login:", error);
        alert("Usuario o contraseña inválida");
      }
    });
  
    return (
      <div className='bg-black px-10 py-20 rounded-3xl border-2 border-purple-700 text-white'>
        <h1 className='text-5xl font-semibold text-purple-700'>Inicio TimeBridge</h1>
        <p className='font-medium text-lg text-white mt-4'>Ingrese datos de usuario.</p>
        <form onSubmit={onSubmit} className='mt-8 text-white '>
          <div>
            <label className='text-xl font-medium'>Correo</label>
            <input {...register("email", { required: true })} className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-white text-xl' type="email" placeholder='Ingresa tu correo' name='email' id='email' />
          </div>
          <div>
            <label className=' text-xl font-medium'>Contraseña</label>
            <input {...register("contraseña_actual", { required: true })} className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-xl' type="password" placeholder='Ingresa tu contraseña' name='contraseña_actual' id='contraseña_actual' />
          </div>
          <div className='mt-8 flex justify-between items-center'>
            <div>
              <input
                type='checkbox'
                id='recuerdame'
              />
              <label className='text-xl ml-2 font-medium text-base' htmlFor="recuerdame">Recuérdame</label>
            </div>
            <button className='text-xl font-medium text-base text-purple-700'>Olvidé mi contraseña</button>
          </div>
          <div className=' mt-6 flex justify-items-center'>
            <p className='text-xl text-align-center'>¿Nuevo usuario?</p>
            <button onClick={() => { window.location.href = '/registrate'; }} className='text-xl font-medium text-base text-purple-700'>Regístrate aquí</button>
          </div>
          <div className='text-xl mt-8 flex flex-col gap-y-4'>
            <button className='text-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-purple-700 text-black text-lg font-bold' type='submit'>Ingresar</button>
          </div>
        </form>
      </div>
    );
}