import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreatePost(props) {
    const [img, setImg] = useState()
    const [text, setText] = useState()
    const navigate = useNavigate()
    async function hendleSubmit(e) {
        e.preventDefault();
        try {
            let baze = new FormData()
            baze.append("img", img);
            baze.append("text", text);
            let { data } = await axios.post('/create-post', baze)
            if (data.error) {
                window.alert(data.error)
            } else {
                navigate('/user/profil')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='ep_page'>
            <div className="cp_form">
                <form onSubmit={hendleSubmit}>
                    <div>
                        <label>
                            {
                                img?.type ?
                                    <div>
                                        <img className="cp_img card-img-top" src={window.URL.createObjectURL(img)} />
                                    </div>
                                    :
                                    <div>
                                        <i className="pr_icon material-icons">add_a_photo</i>
                                    </div>
                            }
                            <input type="file" hidden className='form-control mt-2' onChange={(e) => setImg(e.target.files[0])} />
                        </label>
                    </div>
                    <input type="text"
                        className='rg_inp form-control'
                        placeholder='Enter text...'
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                    <button className='btn ep_btn mt-4 w-100' onClick={hendleSubmit}>Add Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;