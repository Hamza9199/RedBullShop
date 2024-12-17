import React from 'react';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';

const Home: React.FC = () => {
    return (
        <div>
           <Header />
            <main>
                <section>
                    <h2>Featured Products</h2>
                    <div className="products">
                        {/* Add product components here */}
                    </div>
                </section>
                <section>
                    <h2>Latest News</h2>
                    <div className="news">
                        {/* Add news components here */}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;