import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            // Check for token in URL (Google OAuth Redirect)
            const urlParams = new URLSearchParams(window.location.search);
            const urlToken = urlParams.get('token');

            if (urlToken) {
                try {
                    // Remove token from URL for clean browser history
                    window.history.replaceState({}, document.title, window.location.pathname);

                    // Fetch user profile using the token
                    const { data } = await axios.get('https://loaniq-api-rbqu.onrender.com/api/auth/profile', {
                        headers: { Authorization: `Bearer ${urlToken}` }
                    });

                    const authData = { ...data, token: urlToken };
                    setUser(authData);
                    localStorage.setItem('userInfo', JSON.stringify(authData));
                } catch (error) {
                    console.error('Failed to authenticate via URL token:', error);
                    localStorage.removeItem('userInfo');
                    setUser(null);
                }
            } else {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo) {
                    setUser(userInfo);
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('https://loaniq-api-rbqu.onrender.com/api/auth/login', {
                email,
                password,
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const { data } = await axios.post('https://loaniq-api-rbqu.onrender.com/api/auth/register', {
                name,
                email,
                password,
                role
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


