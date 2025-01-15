import React, { useState } from 'react';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import ListaProizvoda from '../komponente/ListaProizvoda';
import './css/Home.css';

/**
 * Komponenta Home predstavlja početnu stranicu aplikacije.
 * 
 * @returns JSX.Element - Početna stranica sa filtrima i listom proizvoda.
 * 
 * Stanja:
 * - searchTerm: string - Termin za pretragu proizvoda.
 * - category: string - Kategorija proizvoda.
 * - priceRange: string - Raspon cijena proizvoda.
 * - imeVozaca: string - Ime vozača za filtriranje proizvoda.
 * 
 * Funkcije:
 * - handleSearchChange: Funkcija za postavljanje termina za pretragu.
 * - handleCategoryChange: Funkcija za postavljanje kategorije proizvoda.
 * - handlePriceRangeChange: Funkcija za postavljanje raspona cijena proizvoda.
 * - handleVozacChange: Funkcija za postavljanje imena vozača za filtriranje proizvoda.
 */
const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [imeVozaca, setImeVozaca] = useState('');

    /**
     * Funkcija za postavljanje termina za pretragu.
     * 
     * @param event - Promjena u input polju za pretragu.
     */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    /**
     * Funkcija za postavljanje kategorije proizvoda.
     * 
     * @param event - Promjena u select polju za kategoriju.
     */
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    /**
     * Funkcija za postavljanje raspona cijena proizvoda.
     * 
     * @param event - Promjena u select polju za raspon cijena.
     */
    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(event.target.value);
    };

    /**
     * Funkcija za postavljanje imena vozača za filtriranje proizvoda.
     * 
     * @param event - Promjena u select polju za ime vozača.
     */
    const handleVozacChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setImeVozaca(event.target.value);
    };

    return (
        <div className='home'>
            <Header />
            <div className="filter">
                <input 
                    type="text" 
                    placeholder="Pretrazi proizvode..." 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    className="search-bar"
                />
                <select value={category} onChange={handleCategoryChange} className="category-filter">
                    <option value="">Sve kategorije</option>
                    <option value="Igracke">Igracke</option>
                    <option value="Odjeca">Odjeca</option>
                    <option value="Obuca">Obuca</option>
                    <option value="Ostalo">Ostalo</option>
                </select>
                <select value={priceRange} onChange={handlePriceRangeChange} className="price-filter">
                    <option value="">Sve cijene</option>
                    <option value="0-50">0 - 50</option>
                    <option value="50-100">50 - 100</option>
                    <option value="100-200">100 - 200</option>
                    <option value="200-500">200 - 500</option>
                </select>
                <select className="sort-filter" value={imeVozaca} onChange={handleVozacChange}>
                    <option value="">Svi Vozaci</option>
                    <option value="Max Verstappen">Max Verstappen</option>
                    <option value="Sergio Perez">Sergio Perez</option>
                </select>
            </div>
            <div className="products">
                <ListaProizvoda searchTerm={searchTerm} category={category} priceRange={priceRange} imeVozaca={imeVozaca} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;