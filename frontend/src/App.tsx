import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {Adresa} from './stranice/Adresa';
import {Korpa} from './stranice/Korpa';
import {Profil} from './stranice/Profil';
import {Proizvod} from './stranice/Proizvod';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/user/:id" element={<Profil />} />
        <Route path="/products" element={<Proizvod />} />
        <Route path="/addresses" element={<Adresa />} />
        <Route path="/cart" element={<Korpa />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
