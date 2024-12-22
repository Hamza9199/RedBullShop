import React, { useEffect } from "react";
import "./css/Footer.css";

const Footer: React.FC = () => {
  const songs = [
    "jG2AciJ3zHY", 
    "jKlL6wvGrbc", 
    "tMSWpIKflrE",
    "d8y3QCiI4_0", 
    "Sbk6BZb9tKk",
    "U6n2NcJ7rLc",
    "hSRW0xHalwo",
    "0Y2PPxrBJt8",

  ];

  const [randomIndex, setRandomIndex] = React.useState<number>(0);

 

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * songs.length));
  }, []);


  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="contactSection">
          <h3>Kontakt</h3>
          <p>Adresa: Politehnički fakultet</p>
          <p>Email: redbullshop@redbull.ba</p>
          <p>Telefon: +387999888</p>
        </div>
        <div className="muzikaSection">
            <iframe
            key={randomIndex}
            src={`https://www.youtube.com/embed/${songs[randomIndex]}?autoplay=1&loop=1&playlist=${songs[randomIndex]}`}
            width="300"
            height="80"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Background Music"                  
            ></iframe>
        </div>
        <div className="linkSection">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/kontakt">Kontakt</a></li>
          </ul>
        </div>
      </div>
      <div className="copyRight">
        <p>&copy; 2024 RedBullShop</p>
      </div>
    </footer>
  );
};

export default Footer;
