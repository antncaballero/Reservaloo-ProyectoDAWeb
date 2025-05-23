import { createContext } from 'react';
import { useAuthState } from '../hooks/useAuthState';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const {user, loading, logout} = useAuthState();

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}