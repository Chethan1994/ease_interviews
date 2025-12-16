
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { analytics } from '../utils/analytics';
import { api } from '../services/api';

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Initial Load & Session Restore
    useEffect(() => {
        const restoreSession = async () => {
            const saved = localStorage.getItem('devprep_user');
            if (saved) {
                try {
                    const localUser = JSON.parse(saved);
                    // Initially set local state to avoid flicker
                    setUser(localUser);
                    
                    // Immediately fetch fresh data from DB to sync progress (Dashboard Details)
                    // This ensures "dashboard details are maintained based on user" across devices
                    try {
                        const freshUser = await api.getUser(localUser.id);
                        setUser(freshUser);
                        // Update local storage with fresh data
                        localStorage.setItem('devprep_user', JSON.stringify(freshUser));
                        // Set GA User ID
                        analytics.setUserId(freshUser.id);
                    } catch (apiError) {
                        console.warn("Could not sync with backend on restore, using local data", apiError);
                        // Fallback: Use local data but still track user
                        analytics.setUserId(localUser.id);
                    }
                } catch (e) {
                    console.error("Failed to parse user session", e);
                    localStorage.removeItem('devprep_user');
                }
            }
        };
        restoreSession();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('devprep_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('devprep_user');
        }
    }, [user]);

    const login = (userData: User) => {
        setUser(userData);
        analytics.setUserId(userData.id);
        analytics.logEvent('login', { method: userData.googleId ? 'google' : 'email' });
    };

    const logout = () => {
        setUser(null);
        // Reset ID? GA doesn't strictly require unsetting, but good for local state logic
        analytics.logEvent('logout');
    };

    const updateUser = (userData: User) => setUser(userData);

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
