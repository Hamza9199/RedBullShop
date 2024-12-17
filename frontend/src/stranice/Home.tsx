import React from 'react';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import ListaProizvoda from '../komponente/ListaProizvoda';

const Home: React.FC = () => {
    return (
        <div>
           <Header />
            <main>
                <section>
                    <h2>Featured Products</h2>
                    <div className="products">
                        <ListaProizvoda />
                    </div>
                </section>
                
            </main>
            <Footer />
        </div>
    );
};

export default Home;