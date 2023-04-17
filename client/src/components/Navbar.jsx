import React from 'react';
import './navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { usePerson } from './Context';

function Navbar(props) {
    const navigate = useNavigate()
    const [state, setState] = usePerson()
    const LogOut = () => {
        navigate('/')
        localStorage.clear()
        setState('')
    }
    return (
        <div className='nv_page'>
            {
                state?.data
                    ?
                    <div className="nv_quti">
                        <NavLink to={'/'} className='nav_link'>Home</NavLink>
                        <NavLink to={'/user/create-post'} className='nav_link'>Create post</NavLink>
                        <NavLink to={'/user/profil'} className='nav_link'>{state?.data?.name}</NavLink>
                        <NavLink onClick={LogOut} to={'/'} className='nav_link'>Log out</NavLink>
                    </div>
                    :
                    <div className="nv_quti1">
                        <NavLink to={'/register'} className='nav_link'>Register</NavLink>
                        <NavLink to={'/login'} className='nav_link'>Login</NavLink>
                    </div>
            }
        </div>
    );
}

export default Navbar;