import './App.css';
import Login from './Components/Login';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import MainLayout from './Components/MainLayout';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<Login />} />
        <Route  path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
