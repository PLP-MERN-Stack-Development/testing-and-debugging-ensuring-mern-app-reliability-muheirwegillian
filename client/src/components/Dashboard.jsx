import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await getDashboardData();
                if (response.success) {
                    setData(response.data);
                } else {
                    setError(response.message || 'Failed to load dashboard data');
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div className="dashboard">Loading...</div>;
    }

    if (error) {
        return <div className="dashboard error">{error}</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
            <div className="dashboard-content">
                <p>Welcome, {data?.user?.name || 'User'}!</p>
                <p>Email: {data?.user?.email || 'N/A'}</p>
            </div>
        </div>
    );
};

export default Dashboard;

