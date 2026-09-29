import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Registro(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    async function registrar(e){
        e.preventDefault()
        let respuesta=await fetch("http://127.0.0.1:8000/api/usuarios/registro/",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
                
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        console.log(respuesta)
        let datos=await respuesta.json()
        console.log(datos.mensaje)
        alert(datos.mensaje)


        // Si el mensaje es que el usuario fue creado correctamente, redirigir a la página de login
        if(datos.mensaje==="Usuario regitrado correctamente"){
            navigate("/dashboard")
        }   
    }
    return(
        <div>
            <form onSubmit={registrar}>
                <input placeholder="escriba username" onChange={(e)=>setUsername(e.target.value)}></input>
                <input placeholder="escriba email" onChange={(e)=>setEmail(e.target.value)}></input>
                <input placeholder="escriba password" onChange={(e)=>setPassword(e.target.value)}></input>
                <button type="submit">aceptar</button>            
            </form>
        </div>
    )
}
export default Registro