import "./App.css";
import Navbar from "./pages/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import axios from "axios";

function App() {

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common['Authorization']= data?.token;
  }, []);

  return (
    <div className="container-fluid">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
