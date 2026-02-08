import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
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

    const handleAddToCart = () => {
        if (!user) {
            alert('Please login to add items to your cart.');
            navigate('/login');
            return;
        }
        addToCart(product);
        alert('Added to cart!');
    };

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
                    <p className="detail-price">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price * 1000)}</p>
                    <p className="detail-desc">{product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <button onClick={handleAddToCart} className="cta-button" style={{ marginTop: '1rem' }}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
