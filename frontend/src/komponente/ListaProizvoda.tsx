import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    naziv: string;
    cijena: number;
    slikaURL: string;
}

const ListaProizvoda: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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
        navigate(`/proizvod/${id}`);
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-item" onClick={() => handleClick(product.id)}>
                    <img src={product.slikaURL} alt={product.naziv} />
                    <h3>{product.naziv}</h3>
                    <p>${product.cijena.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default ListaProizvoda;