import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {Korpa} from './stranice/Korpa';
import {Profil} from './stranice/Profil';
import {Proizvod} from './stranice/Proizvod';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/korisnik/:id" element={<Profil />} />
        <Route path="/proizvodi" element={<Proizvod />} />
        <Route path="/korpa" element={<Korpa />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
