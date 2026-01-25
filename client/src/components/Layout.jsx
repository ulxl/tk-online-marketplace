import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Layout() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="nav-brand">
                    <Link to="/">MyStore</Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
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
                <p>&copy; 2026 MyStore. All rights reserved.</p>
            </footer>
        </div>
    );
}
