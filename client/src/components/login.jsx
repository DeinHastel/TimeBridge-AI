import '../normal.css'
import '../App.css';
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { loginUser } from '../api/userServicesLogin.api';

 
export function LoginUsuario({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

      onLoginSuccess(data.username);
      navigate('/timebridge')
      console.log(data)

    }

    catch (error) {
      console.error("Error al iniciar sesion", error)
      
      setErrorMessage("Error con los datos en el inicio de sesión");
    } finally {
      setIsLoading(false);
    }
  };
  

    return(
        <div className='bg-black px-10 py-20 rounded-3xl border-2 border-purple-700 text-white' >
            <h1 className='text-5xl font-semibold text-purple-700'>Bienvenido</h1>
            <p className='font-medium text-xl text-white mt-4'>Por favor ingresa tus datos.</p>
            <form className='mt-8 text-white' onSubmit={handleSubmit}>
                <div>
                    <label className='text-xl font-medium'>Correo</label>
                    <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Ingresa tu correo'
                    className='text-xl w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent text-white' />
                </div>
                <div>
                <label className='text-xl font-medium'>Contraseña</label>
                    <input
                    type="password"
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Ingresa tu contraseña'
                    className='text-xl w-full border-2 border-purple-700 rounded-xl p-5 mt-2 bg-transparent' />
                </div>
                
                {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input
                            type='checkbox'
                            id='recuerdame'
                        />
                        <label className='text-xl ml-2 font-medium text-base' htmlFor="recuerdame">Recuerdame</label>
                    </div>
                    <button 

                    className='font-medium text-base text-purple-700'>Olvide mi contraseña
                    </button>
                </div>
                <div className='text-align-center mt-4 flex justify-items-center'>
                    <p className=' text-xl'>¿no tienes usuario?    </p>
                    <button onClick={() => { navigate('/registrate'); }} className='font-medium text-xl text-purple-700'> Registrate aqui</button>
                </div>
                {/* <Link to='/timebridge'> */}
                    <div className='mt-8 flex flex-col gap-y-4'>
                <button 
                type='submit'
                disabled = {isLoading}
                onClick={handleSubmit}
                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-purple-700 text-black text-xl font-bold'>Ingresar
                </button>
                </div>
                {/* </Link> */}
            </form>
        
        </div>
    )

}