import React from 'react';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import ListaProizvoda from '../komponente/ListaProizvoda';
import './css/Home.css';

const Home: React.FC = () => {
    return (
        <div className='home'>
            <Header />
            <div className="products">
                <ListaProizvoda />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
