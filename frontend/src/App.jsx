import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import CreateHabitPage from './pages/habits/CreateHabitPage.jsx';
import HabitSettingsPage from './pages/habits/HabitSettingsPage.jsx';
import TodayPage from './pages/main/TodayPage.jsx';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                try {
                    const response = await axios.post(
                        `${baseUrl}/auth/refresh`,
                        {},
                        { withCredentials: true },
                    );

                    localStorage.setItem('accessToken', response.data.accessToken);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.log('No valid session found');
                    setIsAuthenticated(false);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        verifyAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                Loading...
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route
                    path="/register"
                    element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
                />

                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <LoginPage setAuth={setIsAuthenticated} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                {/* protected routes */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <TodayPage onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/habits/create"
                    element={isAuthenticated ? <CreateHabitPage /> : <Navigate to="/login" />}
                />

                <Route
                    path="/habits/:id/settings"
                    element={isAuthenticated ? <HabitSettingsPage /> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
