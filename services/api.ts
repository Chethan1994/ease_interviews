import { User } from '../types';

export const API_BASE = 'https://interview-express-backend.vercel.app/api';

export const api = {
    async register(email: string, password: string, name: string): Promise<User> {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
        return res.json();
    },

    async login(email: string, password: string): Promise<User> {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
        return res.json();
    },

    async googleLogin(email: string, name: string, googleId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, googleId }),
        });
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