import React, { useState } from 'react';
import { useEffect } from 'react';
import { usePerson } from '../components/Context';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function EditProfil(props) {
    const [state, setState] = usePerson()
    const [name, setName] = useState();
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [img, setImg] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        inputValue()
    }, [])
    function inputValue() {
        setName(state?.data?.name)
        setLogin(state?.data?.login)
        setEmail(state?.data?.email)
    }
    async function hendleSubmit(e) {
        e.preventDefault();
        try {
            let baze = new FormData()
            baze.append("name", name);
            baze.append("login", login);
            baze.append("email", email);
            baze.append("img", img);
            let { data } = await axios.put('/edit-profil', baze)
            console.log(data);
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
        <div className='ep_page'>
            <div className="ep_form">
                <form onSubmit={hendleSubmit}>
                    <div>
                        <label>
                            {
                                img?.type ?
                                    <div>
                                        <img className="pr_img card-img-top" src={window.URL.createObjectURL(img)} />
                                    </div>
                                    :
                                    <div>
                                        <i className="pr_icon material-icons">account_circle</i>
                                    </div>
                            }
                            <input type="file" hidden className='form-control mt-2' onChange={(e) => setImg(e.target.files[0])} />
                        </label>
                    </div>
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
                    <button className='btn ep_btn mt-4 w-100' onClick={hendleSubmit}>Edit</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfil;