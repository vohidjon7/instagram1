import { Route, Routes } from 'react-router-dom';
import './App.css';
import Protected from './components/Protected';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil'
import EditProfil from './pages/EditProfil';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Profil1 from './pages/Profil1';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/v2/:id' element={<Profil1 />} />
        <Route path='/user' element={<Protected />} >
          <Route path='profil' element={<Profil />} />
          <Route path='edit-profil' element={<EditProfil />} />
          <Route path='create-post' element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
