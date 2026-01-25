import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <Link to="/products" className="back-btn">&larr; Back to Products</Link>
            <div className="product-detail">
                <img src={product.image} alt={product.name} className="detail-image" />
                <div className="detail-info">
                    <h1>{product.name}</h1>
                    <p className="detail-price">${product.price}</p>
                    <p className="detail-desc">{product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <button className="cta-button" style={{ marginTop: '1rem' }}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
