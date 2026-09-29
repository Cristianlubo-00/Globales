import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "./services/auth.service"
import "./Auth.css"

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()

    async function iniciarSesion(e){
        e.preventDefault()
        setError("")
        setCargando(true)
        try {
            let datos = await login(username, password)
            if (datos.token) {
                localStorage.setItem("token", datos.token)
                navigate("/dash")
            } else {
                setError(datos.mensaje || "Usuario o contraseña incorrectos")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={iniciarSesion}>
                <h1>Iniciar sesión</h1>
                <p className="login-subtitulo">Ingresa tus datos para continuar</p>

                {error && <div className="login-error">{error}</div>}

                <div className="login-campo">
                    <label htmlFor="username">Usuario</label>
                    <input id="username" placeholder="Escribe tu usuario" autoComplete="username"
                        value={username} onChange={(e)=>setUsername(e.target.value)} required></input>
                </div>

                <div className="login-campo">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" placeholder="Escribe tu contraseña" autoComplete="current-password"
                        value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                </div>

                <button className="login-boton" type="submit" disabled={cargando}>
                    {cargando ? "Ingresando..." : "Entrar"}
                </button>

                <p className="login-pie">¿No tienes cuenta? <Link to="/">Regístrate</Link></p>
            </form>
        </div>
    )
}
export default Login