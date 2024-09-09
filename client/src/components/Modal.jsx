// npm install feather-icons-react
import { XCircle } from 'feather-icons-react';


export default function Modal({open, onClose, title, children}){
    return(
        //Fondo
        <div onClick={onClose} className={`fixed inset-0 flex items-center justify-center
        transition-colors first-letter ${open ? "visible bg-black/20" : "invisible"}`}>

            {/* Modal */}
            <div
            onClick={(e) => e.stopPropagation()}
            className={`
            bg-n-15 rounded-xl shadow p-6 transition-all 
            w-2/4 h-3./4
            ${open ? "scale-100 opacity-200" : "scale-125 opacity-0 "}`}>

            {/* Boton de cierre */}
            <button
            onClick={onClose} 
            className="absolute top-2 right-2 p-1 rounded-lg
            text-white bg-gray-700 hover:bg-gray-50
            hover:text-gray-500"> 
                <XCircle size={18} />
            </button>
            {/* Titulo */}

            {title}

            {/* Contenido */}
            {children}
            </div>

        </div>

    )
}