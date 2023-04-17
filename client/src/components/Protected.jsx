import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login'

function Protected(props) {
    const [isTrue, setIsTrue] = useState(false)
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userinfo"))
        if(data) setIsTrue(true)
    }, [])
    return (
        <div>
            {
                isTrue ? <Outlet /> : <Login/>  
            }
        </div>
    );
}

export default Protected;