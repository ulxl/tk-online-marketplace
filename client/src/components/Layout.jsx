import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

export default function Layout() {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="nav-brand">
                    <Link to="/">OurMarket</Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li>
                        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            Cart
                            {cart.length > 0 && <span style={{ background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.8rem' }}>{cart.length}</span>}
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li><span>Hello, {user.username}</span></li>
                            <li><button onClick={logout} className="logout-btn">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
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
