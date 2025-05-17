import { fetchWithAuth } from '../api/api';
import { useState, useEffect } from 'react';

export function useAuthState() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // const response = await fetchWithAuth('/auth/check');
            const response = await fetch('http://localhost:3000/auth/check', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error('Error checking auth:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetchWithAuth('/auth/logout', { method: 'POST' });
            setUser(null);
            window.location.href = 'http://localhost:3000/auth/login';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    // El user lleva el id, nombre, email y rol
    return {user, loading, logout};
}