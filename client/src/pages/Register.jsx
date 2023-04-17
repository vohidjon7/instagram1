import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerson } from '../components/Context';
import './pages.css'

function Register(props) {
    const [name, setName] = useState();
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [state,setState] = usePerson();
    const navigate = useNavigate();

    async function hendleSubmit(e) {
        e.preventDefault();
        try {
            let baze = new FormData()
            baze.append("name", name);
            baze.append("login", login);
            baze.append("email", email);
            baze.append("password", password);
            let { data } = await axios.post('/register', baze)
            if (data.error) {
                window.alert(data.error)
            } else {
                localStorage.setItem('userinfo', JSON.stringify(data));
                setState(data)
                navigate('/user/profil')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='rg_page'>
            <div className='rg_form'>
                <div className='rg_text'>
                    <h4>Register</h4>
                </div>
                <form onSubmit={hendleSubmit}>
                    <input type="text"
                        className='rg_inp form-control'
                        placeholder='Enter your name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input type="email"
                        className='rg_inp form-control'
                        placeholder='Enter your email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
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
                <button className='btn btn1 rg_inp' onClick={hendleSubmit}>Register</button>
            </div>
        </div>
    );
}

export default Register;