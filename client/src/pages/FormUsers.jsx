import { LoginUsuario } from "../components/login";

export function FormUsers ({ onLoginSuccess }) {
    return (
        <div className="login flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2 text-base">
                <LoginUsuario onLoginSuccess={onLoginSuccess} />

            </div>
            <div className="login_bola hidden relative lg:flex h-full w-1/2 items-center justify-center">
                <div className="w-60 h-60 bg-gradient-to-tr from-purple-400 to-purple-600 rounded-full animate-pulse" />
                <div className="w-full h-1/2 absolute bottom-0 bg-black/5 backdrop-blur-lg" />

            </div>
        </div>
    );
}

export default FormUsers;
