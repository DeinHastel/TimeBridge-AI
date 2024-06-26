import '../normal.css'
import '../App.css';
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { loginUser } from '../api/userServicesLogin.api';

 
export function LoginUsuario() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await loginUser(formData);
      console.log("success", data)
      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh)
      navigate('/timebridge');
    }
    catch (error) {
      console.error("Error al iniciar sesion", error)
    } finally {
      setIsLoading(false);
    }
  };

    return(
        <div className='bg-black px-10 py-20 rounded-3xl border-2 border-purple-700 text-white' >
            <h1 className='text-5xl font-semibold text-purple-700'>Bienvenido</h1>
            <p className='font-medium text-lg text-white mt-4'>Porfavor ingresa tus datos.</p>
            <form className='mt-8 text-white'>
                <div>
                    <label className='text-lg font-medium'>Correo</label>
                    <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Ingresa tu correo'
                    className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-white' />
                </div>
                <div>
                <label className='text-lg font-medium'>Contraseña</label>
                    <input
                    type="password"
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Ingresa tu contraseña'
                    className='w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent' />
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input
                            type='checkbox'
                            id='recuerdame'
                        />
                        <label className='ml-2 font-medium text-base' htmlFor="recuerdame">Recuerdame</label>
                    </div>
                    <button 

                    className='font-medium text-base text-purple-700'>Olvide mi contraseña
                    </button>
                </div>
                {/* <Link to='/timebridge'> */}
                    <div className='mt-8 flex flex-col gap-y-4'>
                <button 
                type='submit'
                disabled = {isLoading}
                onClick={handleSubmit}
                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-purple-700 text-black text-lg font-bold'>Ingresar
                </button>
                </div>
                {/* </Link> */}
            </form>
        
        </div>
    )

}