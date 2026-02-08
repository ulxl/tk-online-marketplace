import { Link, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

export default function Layout() {
    const { user, logout } = useContext(AuthContext);
    const cartContext = useContext(CartContext);
    const cart = cartContext?.cart || [];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="nav-brand">
                    <Link to="/">OurMarket</Link>
                </div>

                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
                    <li>
                        <Link to="/cart" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            Cart
                            {cart.length > 0 && <span style={{ background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.8rem' }}>{cart.length}</span>}
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li><span>Hello, {user.username}</span></li>
                            <li><button onClick={() => { logout(); setIsMenuOpen(false); }} className="logout-btn">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                            <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <p>&copy; 2026 OurMarket. All rights reserved.</p>
            </footer>
        </div>
    );
}
