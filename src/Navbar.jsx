import {Link, link, useNavigate} from 'react-router-dom'

function Navbar(){
    return(
        <div>
            <Link to="/Dash">Dashboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/registro">Registro</Link>


        </div>
    )
}