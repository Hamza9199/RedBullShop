import React from 'react';
import './css/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
        <div className={"footerContent"}>
            <div className={"contactSection"}>
                <h3>Kontakt</h3>
                <p>Adresa: Politehnicki fakultet</p>
                <p>Email: redbullshop@redbull.ba</p>
                <p>Telefon: +387999888</p>
            </div>
            <div className={"muzikaSection"}>
            <iframe
                                src="https://www.youtube.com/embed/jG2AciJ3zHY?autoplay=1&loop=1&playlist=jG2AciJ3zHY"
                                width="300"
                                height="80"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Background Music"
                            ></iframe>
            </div>
                <div className={"linkSection"}>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/kontakt">Kontakt</a></li>
                    
                </ul>
            </div>
        </div>
        <div className={"copyRight"}>
            <p>&copy; 2024 RedBullShop</p>
        </div>
    </footer>
    );
};

export default Footer;
