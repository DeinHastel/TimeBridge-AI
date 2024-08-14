import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TimeBridgeIA} from './pages/TimeBridgeIA'
import { RegistroUsuario } from './pages/registro'
import FormRegistro from './components/FormRegistro'
import { LoginUsuario } from './components/login'
import {FormUsers} from './pages/FormUsers'
import { infoUser } from './api/userServicesInfo.api'
import { logoutUser } from './api/userServicesLogout'
import ProtectedRoute from './components/ProtectedRoute';

import './normal.css'
import './App.css'

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("");

  useEffect (()=>{
    const checkLoggedInUser = async () =>{
      try{
        const token = localStorage.getItem("accessToken");
        if(token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          const data = await infoUser(config) 
          setLoggedIn(true)
          setUsername(data.username)
        }
        else{
          setLoggedIn(false);
          setUsername("");
        }
      }
      catch(error){
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser()
  },[])

  const handleLoginSuccess = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handlelogout = async () => {
    try{
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logoutUser({ refresh: refreshToken });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
      }

    }
    catch(error){
      console.log("Failed Logout")

    }
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<FormUsers onLoginSuccess={handleLoginSuccess} />} />
        <Route path='/registrate' element={<FormRegistro />} />
        <Route path='/' element={<Navigate to="/login" />} />
        <Route
          path="/timebridge"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TimeBridgeIA />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
