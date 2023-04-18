import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerson } from '../components/Context';
import './pages.css'

function Login(props) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [state,setState] = usePerson();
    const navigate = useNavigate();

    async function hendleSubmit(e) {
        e.preventDefault();
        try {
            let baze = new FormData()
            baze.append("login", login);
            baze.append("password", password);
            let { data } = await axios.post('/login', baze)
            console.log(data);
            if (data.error) {
                window.alert(data.error)
            } else {
                navigate('/user/profil')
                localStorage.setItem('userinfo', JSON.stringify(data));
                setState(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='rg_page'>
            <div className='rg_form'>
                <div className='rg_text'>
                    <h4>Login</h4>
                </div>
                <form onSubmit={hendleSubmit}>
                    <input type="login"
                        className='rg_inp form-control'
                        placeholder='Enter your login...'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)} />
                    <input type="password"
                        className='rg_inp form-control'
                        placeholder='Enter your password...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </form>
                <button className='btn btn1 rg_inp' onClick={hendleSubmit}>Login</button>
            </div>
        </div>
    );
}

export default Login;