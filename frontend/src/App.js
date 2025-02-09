import './App.css';
import { Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './contexts/notes/Notestate';
import About from './components/About';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
<NoteState>
    <Navbar/>
    <div className="container">
    <Routes>
      <Route path="/" element={<Home/> } />
      <Route path="/about" element={<About/> } />
      <Route path="/login" element={<Login/> } />
      <Route path="/signup" element={<Signup/> } />
    </Routes>
    </div>
    </NoteState>
  </>
  );
}

export default App;
