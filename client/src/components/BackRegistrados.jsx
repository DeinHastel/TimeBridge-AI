import { useEffect, useState } from "react"
import { ObtenerUsuarios } from "../api/registrados.api"

export function BackRegistrados(){

    const [usuarios,setUsuarios] = useState([])

    useEffect(() => {
        async function CargarUsuarios (){
            const res = await ObtenerUsuarios()
        setUsuarios(res.data)
        }
        CargarUsuarios();

    }, [])


    return (
        <div>{usuarios.map(usuario => (
            <div key={usuario.id_usuario}>
                <h1>{usuario.nombre}</h1>
                <p>{usuario.email}</p>
            </div>
        ))}</div>
    )
}