import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alerts/AlertState'

function App() {
  return (
    <>
    <AlertState>
    <NoteState>
      
      <Navbar/>
      
      <div className="container">
      <Alert message="Great!! you are leaning a new skiil..."/>
      <Routes>
        <Route path="/" key='home' element={<Home/>} />
        <Route path="about" key='about' element={<About />} />
        <Route path="login" key='login' element={<Login/>} />
        <Route path="signup" key='signup' element={<Signup/>} />
      </Routes>
      </div>
    </NoteState>
    </AlertState>
    </>
  );
}

export default App;
