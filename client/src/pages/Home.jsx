import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-page">
            <div className="hero">
                <h1>Welcome to OurMarket</h1>
                <p>Find everything you need, for yourself and your loved ones, at OurMarket.</p>
                <br />
                <Link to="/products" className="cta-button">Shop Now</Link>
            </div>
        </div>
    );
}
