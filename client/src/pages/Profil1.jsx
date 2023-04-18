import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePerson } from '../components/Context';

function Profil1(props) {
    const [state, setState] = usePerson()
    const [post, setPost] = useState([]);
    const [text,setText] = useState()
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const { id } = useParams();
    async function getUser() {
        let { data } = await axios.get(`/get-user/${id}`)
        if (data) {
            setUser(data)
        } else {
            navigate('/')
            window.alert('User is not found')
        }
    }
    const loadPost = async () => {
        let { data } = await axios.get(`/get-user-post/${id}`);
        setPost(data)
    }
    useEffect(() => {
        loadPost()
        getUser()
    }, [])
    async function likePost(postId) {
        const id = new FormData();
        id.append('id', postId)
        let { data } = await axios.put('/like-post', id)
        setPost(
            post.map((s) => {
                if (s._id === postId) {
                    return data;
                } else {
                    return s;
                }
            })
        )
    }
    async function unLikePost(postId) {
        const id = new FormData();
        id.append('id', postId)
        let { data } = await axios.put('/unlike-post', id)
        setPost(
            post.map((s) => {
                if (s._id === postId) {
                    return data;
                } else {
                    return s;
                }
            })
        )
    }

    async function addComment(postId) {
        const id = new FormData();
        id.append('id', postId)
        id.append('text', text)
        let { data } = await axios.put('/add-comment', id)
    }
    async function followUser(postId) {
        const id = new FormData();
        id.append('id', postId)
        if (state?.data?._id) {
            let { data } = await axios.put('/follow-user', id)
            setUser(data)
        } else {
            alert("Ro'yhatdan  o'tilmagan")
            navigate('/login')
        }
    }
    async function unFollowUser(postId) {
        const id = new FormData();
        id.append('id', postId)
        let { data } = await axios.put('/unfollow-user', id)
        setUser(data)
    }
    return (
        <div className='pr_page'>
            <div className="pr_quti">
                <div className="pr_text">
                    <h3>{user?.name}</h3>
                    {
                        user?.followers?.includes(state?.data?._id)
                            ?
                            <button className='btn pr_btn' onClick={() => unFollowUser(user?._id)}>Un Follow</button>
                            :
                            <button className='btn pr_btn' onClick={() => followUser(user?._id)}>Follow</button>

                    }
                </div>
                <div className='pr_quti1'>
                    {
                        user?.edit ?
                            <div>
                                <img className="pr_img card-img-top" src={`http://localhost:5000/api/get-photo/${state?.data?._id}`} />
                            </div>
                            :
                            <div>
                                <i className="pr_icon material-icons">account_circle</i>
                            </div>
                    }
                    <div className='pr_quti2'>
                        <div className='pr_quti3'>
                            <h6>{user?.followers.length}</h6>
                            <p>Followers</p>
                        </div>
                        <div className='pr_quti3'>
                            <h6>{post.length}</h6>
                            <p>Posts</p>
                        </div>
                    </div>
                </div>
                <div className="pr_quti4">
                    {
                        post?.map((s, idx) => {
                            return (
                                <div className="hm_card card" style={{ width: '18rem' }} key={idx}>
                                    <img src={`http://localhost:5000/api/get-post-photo/${s?._id}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <div className='like_comment' >
                                            <div style={{ overflow: "auto", height: "60px" }}>
                                                Comments:
                                                {
                                                    s?.comments?.map(ss => {
                                                        return <div>
                                                            <p>{ss.text}</p>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                            <form className='d-flex'>
                                                <span className='hm_like'>
                                                    {
                                                        s.likes.includes(state?.data?._id)
                                                            ?
                                                            <i className="fa-solid fa-heart" style={{ cursor: "pointer" }} onClick={() => unLikePost(s?._id)}></i>
                                                            :
                                                            <i className="fa-regular fa-heart" style={{ cursor: "pointer" }} onClick={() => likePost(s?._id)}></i>
                                                    }
                                                </span>
                                                <input type="text" className='hm_inp form-control' onChange={(e) => setText(e.target.value)} />
                                                <button className='btn hm_btn' onClick={() => addComment(s._id)}><i className="fa-sharp fa-regular fa-paper-plane"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Profil1;