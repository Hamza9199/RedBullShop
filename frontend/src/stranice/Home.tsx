
import React, { useState } from 'react';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import ListaProizvoda from '../komponente/ListaProizvoda';
import './css/Home.css';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(event.target.value);
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
            </div>
            <div className="products">
                <ListaProizvoda searchTerm={searchTerm} category={category} priceRange={priceRange} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;