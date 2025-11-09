import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h2>Welcome to MERN Testing Application</h2>
            <p>This application demonstrates comprehensive testing strategies.</p>
            <div className="home-links">
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
        </div>
    );
};

export default Home;

