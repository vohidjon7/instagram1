import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProdectedRoute from "../components/ProdectedRoute";
import { useProduct } from "./Context";

const Navbar = () => {
  const [state,setState] = useProduct()
  const Logout =()=>{
    localStorage.clear()
    setState('')
    ProdectedRoute()
  }

  return (
    <div className="navbar">
      <nav class="navbar navbar-expand-lg bg-body-tertiary w-100">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Instagram
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
             {
              (state?.user?.name) ?
              <div >
                <ul style={{color:"black",display:"flex",margin:"0 auto",gap:"1rem"}} >
                  <NavLink style={{textDecoration:"none",display:"flex",alignItems:"center",color:"black"}}  onClick={()=>Logout()}>Logout</NavLink>
                </ul>
              </div> :
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/login">
                Login
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register">
                Register
              </a>
            </li>
          </ul>
             }
            {/* <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
