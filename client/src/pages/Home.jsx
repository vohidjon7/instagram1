import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerson } from '../components/Context';

function Home(props) {
    const [post, setPost] = useState([])
    const [text, setText] = useState()
    const [state, setState] = usePerson()
    const navigate = useNavigate()

    useEffect(() => {
        getAllPost()
    }, [])

    const getAllPost = async () => {
        let { data } = await axios.get('/get-post')
        if (data) {
            setPost(data)
        } else {
            console.log(data);
        }
    }
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
        console.log(data);
    }
    return (
        <div className='hm_page'>
            <div className="hm_quti">
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
                                    <button className='btn ep_btn mt-4 w-100' onClick={() => navigate(`/v2/${s.postedBy}`)}>Posted By : {s.postedBy1}</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Home;