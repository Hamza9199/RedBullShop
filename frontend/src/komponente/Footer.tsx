import React from 'react';
import './css/Footer.css'; 

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} RedBullShop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;