import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/ListaProizvoda.css'; 


interface Product {
    id: number;
    naziv: string;
    cijena: number; 
    slikaURL: string;
    kategorija: string;
}

interface ListaProizvodaProps {
    searchTerm: string;
    category: string;
    priceRange: string;
}

const ListaProizvoda: React.FC<ListaProizvodaProps> = ({ searchTerm, category, priceRange }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
    const isAuth = token?.accessToken || '';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleClick = (id: number) => {
        if (isAuth) {
            navigate(`/proizvod/${id}`);
        } else {
            if (window.confirm('Morate biti prijavljeni da biste vidjeli detalje proizvoda. Želite li se prijaviti?')) {
                navigate('/login');
            }
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearchTerm = product.naziv.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === '' || product.kategorija === category;
        const matchesPriceRange = priceRange === '' || (
            product.cijena >= parseInt(priceRange.split('-')[0]) &&
            product.cijena <= parseInt(priceRange.split('-')[1])
        );
        return matchesSearchTerm && matchesCategory && matchesPriceRange;
    });

  
    

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
