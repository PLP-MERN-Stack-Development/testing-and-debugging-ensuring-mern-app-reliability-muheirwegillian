import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {
    render() {
        return (
            <ErrorBoundary>
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <h1>MERN Testing Application</h1>
                        </header>
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </ErrorBoundary>
        );
    }
}

export default App;

