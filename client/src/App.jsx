import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TimeBridgeIA} from './pages/TimeBridgeIA'
import { BackRegistrados } from './components/BackRegistrados'
import { RegistroUsuario } from './pages/registro'
import FormRegistro from './components/FormRegistro'
import { LoginUsuario } from './components/login'
import {FormUsers} from './pages/FormUsers'
import './normal.css'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/timebridge' element={<TimeBridgeIA/>} />
        <Route path='/login-users' element={<FormUsers/>} />
        <Route path='/registered' element={<BackRegistrados/>} />
        <Route path='/registrate' element={<FormRegistro/>} />
        <Route path='/' element={<Navigate to="/login-users"/>} />


      </Routes>
    </BrowserRouter>
  )
  }

export default App
