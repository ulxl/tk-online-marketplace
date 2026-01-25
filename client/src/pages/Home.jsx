import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-page">
            <div className="hero">
                <h1>Welcome to MyStore</h1>
                <p>Your one-stop shop for everything you need.</p>
                <br />
                <Link to="/products" className="cta-button">Shop Now</Link>
            </div>
        </div>
    );
}
