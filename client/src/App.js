import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<VerifyEmail />} path="/verify" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
