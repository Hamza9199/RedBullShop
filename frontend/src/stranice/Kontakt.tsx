import React from 'react';
import Footer from "../komponente/Footer";
import Header from "../komponente/Header";
import './css/Kontakt.css';

// Komponenta Kontakt predstavlja kontakt stranicu aplikacije.
export const Kontakt = () => {

    // Funkcija za rukovanje slanjem forme.
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert("Poruka je uspješno poslana!");
    };

    return (
        <>
            <Header />
            <div className="kontakt-container">
                <h1 className="kontakt-naslov">Kontaktirajte nas</h1>
                <p className="kontakt-opis">Imate pitanje? Pošaljite nam poruku putem obrasca ili nas kontaktirajte direktno putem navedenih informacija.</p>
                <form className="kontakt-forma">
                    <div className="forma-grupa">
                        <label htmlFor="ime" className="kontakt-label">Ime:</label>
                        <input type="text" id="ime" className="kontakt-input" placeholder="Unesite svoje ime" />
                    </div>
                    <div className="forma-grupa">
                        <label htmlFor="email" className="kontakt-label">Email:</label>
                        <input type="email" id="email" className="kontakt-input" placeholder="Unesite svoj email" />
                    </div>
                    <div className="forma-grupa">
                        <label htmlFor="poruka" className="kontakt-label">Poruka:</label>
                        <textarea id="poruka" className="kontakt-tekstarea" rows={5} placeholder="Unesite svoju poruku"></textarea>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="kontakt-dugme">Pošalji</button>
                </form>
                <div className="kontakt-info">
                    <h2 className="info-naslov">Kontakt informacije</h2>
                    <p className="info-tekst">Telefon: +387 62 123 456</p>
                    <p className="info-tekst">Email: redbullshop@redbull.ba</p>
                    <p className="info-tekst">Adresa: Politehnički fakultet</p>
                </div>
            </div>
            <Footer />
        </>
    );
};
