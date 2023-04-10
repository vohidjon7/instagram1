import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const ProdectedRoute = () => {
    const [isTrue,setIsTrue] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
       let data = JSON.parse(localStorage.getItem("user"));
       if(data) setIsTrue(!isTrue) 
    }, []);
    return (
        <>
          {
            isTrue ? <Outlet/> : <Login/>
          }  
        </>
    );
}

export default ProdectedRoute;
