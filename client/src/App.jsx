import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TimeBridgeIA } from "./pages/TimeBridgeIA";
import { RegistroUsuario } from "./pages/registro";
import FormRegistro from "./components/FormRegistro";
import { LandingPage } from "./pages/LandingPage";
import { LoginUsuario } from "./components/login";
import { FormUsers } from "./pages/FormUsers";
import { infoUser } from "./api/userServicesInfo.api";
import { logoutUser } from "./api/userServicesLogout";
import ProtectedRoute from "./components/ProtectedRoute";
import PaypalComponent from "./components/paypal";
import "./App.css";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const data = await infoUser(config);
          setLoggedIn(true);
          setUsername(data.username);
        } else {
          setLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser();
  }, []);

  const handleLoginSuccess = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<FormUsers onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/registrate" element={<FormRegistro />} />
        <Route path="/paypal" element={<PaypalComponent />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/landing" />} />
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
