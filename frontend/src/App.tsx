import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {Korpa} from './stranice/Korpa';
import {Profil} from './stranice/Profil';
import {Proizvod} from './stranice/Proizvod';
import ProtectedRoute from './context/ProtectedRoute';
import Home from './stranice/Home';
import Login from './stranice/Login';
import Register from './stranice/Register';
import Dashboard from './stranice/Dashborad';
import Narudzba from './stranice/Narudzba';
import { NovaAdresa } from './stranice/NovaAdresa';
import { NovaRecenzija } from './stranice/NovaRecenzija';
import { NoviProizvod } from './stranice/NoviProizvod';
import { Recenzija } from './stranice/Recenzija';
import { Kontakt } from './stranice/Kontakt';
import  UpdateKorisnik  from './stranice/UpdateKorisnik';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/narudzba" element={<ProtectedRoute element={<Narudzba />} />} />          {/* treba dodati */}
          <Route path="/nova-adresa" element={<ProtectedRoute element={<NovaAdresa />} />} />
          <Route path="/update-adresa/:id" element={<ProtectedRoute element={<NovaAdresa />} />} />
          <Route path="/nova-recenzija" element={<ProtectedRoute element={<NovaRecenzija />} />} />
          <Route path="/update-recenzija/:id" element={<ProtectedRoute element={<NovaRecenzija />} />} />
          <Route path="/novi-proizvod" element={<ProtectedRoute element={<NoviProizvod />} />} />
          <Route path="/update-proizvod/:id" element={<ProtectedRoute element={<NoviProizvod />} />} />
          <Route path="/recenzija/:id" element={<ProtectedRoute element={<Recenzija />} />} />
          <Route path="/korisnik/:id" element={<ProtectedRoute element={<Profil />} />} />
          <Route path="/update-korisnik/:id" element={<ProtectedRoute element={<UpdateKorisnik />} />} />
          <Route path="/proizvod/:id" element={<ProtectedRoute element={<Proizvod />} />} />
          <Route path="/korpa" element={<ProtectedRoute element={<Korpa />} />} />               {/* treba dodati */}
        </Routes>
      </Router>
    </>
  );
}

export default App;