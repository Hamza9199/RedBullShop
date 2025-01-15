import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/ListaProizvoda.css'; 

// Definicija interfejsa za proizvod
interface Product {
    id: number;
    naziv: string;
    cijena: number; 
    slikaURL: string;
    kategorija: string;
}

// Definicija interfejsa za props komponente ListaProizvoda
interface ListaProizvodaProps {
    searchTerm: string;
    category: string;
    priceRange: string;
    imeVozaca: string;
}

const ListaProizvoda: React.FC<ListaProizvodaProps> = ({ searchTerm, category, priceRange, imeVozaca }) => {
    const [products, setProducts] = useState<Product[]>([]); // Stanje za proizvode
    const [loading, setLoading] = useState<boolean>(true); // Stanje za učitavanje
    const [error, setError] = useState<string | null>(null); // Stanje za greške
    const listRef = useRef<HTMLDivElement>(null); // Ref za listu proizvoda
    const navigate = useNavigate(); // Hook za navigaciju

    // Dohvati token iz lokalne pohrane
    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
    const isAuth = token?.accessToken || '';

    // useEffect hook za dohvaćanje proizvoda
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/server/proizvodi');
                setProducts(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Prikaz učitavanja
    if (loading) {
        return <div>Loading...</div>;
    }

    // Prikaz greške
    if (error) {
        return <div>{error}</div>;
    }

    // Funkcija za rukovanje klikom na proizvod
    const handleClick = (id: number) => {
        if (isAuth) {
            navigate(`/proizvod/${id}`);
        } else {
            if (window.confirm('Morate biti prijavljeni da biste vidjeli detalje proizvoda. Želite li se prijaviti?')) {
                navigate('/login');
            }
        }
    };

    // Filtriranje proizvoda prema zadanim kriterijima
    const filteredProducts = products.filter(product => {
        const matchesSearchTerm = product.naziv.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === '' || product.kategorija === category;
        const matchesPriceRange = priceRange === '' || (
            product.cijena >= parseInt(priceRange.split('-')[0]) &&
            product.cijena <= parseInt(priceRange.split('-')[1])
        );
        const matchesVozac = imeVozaca === '' || product.naziv.toLowerCase().includes(imeVozaca.toLowerCase());

        return matchesSearchTerm && matchesCategory && matchesPriceRange && matchesVozac;
    });

    // Rendiranje liste proizvoda
    return (
        <div className="product-list" ref={listRef}>
            {filteredProducts.map(product => (
                <div key={product.id} className="product-item" onClick={() => handleClick(product.id)}>
                    <img src={product.slikaURL} alt={product.naziv} className="product-image" />
                    <h3 className="product-name">{product.naziv}</h3>
                    <p className="product-price">${product.cijena.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default ListaProizvoda;
