import { User } from '../types';

// Use relative path for API calls. 
// In development, Webpack proxy forwards '/api' to 'http://localhost:5000/api'.
export const API_BASE = '/api';

export const api = {
    async register(email: string, password: string, name: string): Promise<User> {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        
        // Safety check: Ensure response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || contentType.indexOf("application/json") === -1) {
             const text = await res.text();
             console.error('Non-JSON response:', text);
             throw new Error(`Server error: ${res.status} ${res.statusText}. Ensure backend is running.`);
        }

        if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
        return res.json();
    },

    async login(email: string, password: string): Promise<User> {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || contentType.indexOf("application/json") === -1) {
             const text = await res.text();
             console.error('Non-JSON response:', text);
             throw new Error(`Server error: ${res.status} ${res.statusText}. Ensure backend is running.`);
        }

        if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
        return res.json();
    },

    async googleLogin(email: string, name: string, googleId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, googleId }),
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || contentType.indexOf("application/json") === -1) {
             const text = await res.text();
             console.error('Non-JSON response:', text);
             throw new Error(`Server error: ${res.status} ${res.statusText}. Ensure backend is running.`);
        }

        if (!res.ok) throw new Error((await res.json()).message || 'Google Login failed');
        return res.json();
    },

    async markMastered(userId: string, masteredId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/user/progress/mastered`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, masteredId }),
        });
        if (!res.ok) throw new Error('Failed to update mastery');
        return res.json();
    },

    async markReviewed(userId: string, reviewedId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/user/progress/reviewed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, reviewedId }),
        });
        if (!res.ok) throw new Error('Failed to update progress');
        return res.json();
    },

    async processPaymentSuccess(userId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/payment/success`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });
        if (!res.ok) throw new Error('Payment processing failed');
        return res.json();
    }
};