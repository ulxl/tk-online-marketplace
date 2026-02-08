import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2>Your Cart is Empty</h2>
                <Link to="/products" className="cta-button" style={{ marginTop: '1rem' }}>Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item._id} className="cart-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee', gap: '1rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                            <h3>{item.name}</h3>
                            <p>Rp {(item.price * 1000).toLocaleString('id-ID')}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="cart-summary" style={{ marginTop: '2rem', textAlign: 'right', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <h3>Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(getCartTotal())}</h3>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button onClick={clearCart} className="cta-button" style={{ backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}>Clear Cart</button>
                    <button className="cta-button">Checkout</button>
                </div>
            </div>
        </div>
    );
}
