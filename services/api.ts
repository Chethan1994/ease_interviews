import { User, Question, Contribution } from '../types';

// Use relative path for API calls. 
// In development, Webpack proxy forwards '/api' to 'http://localhost:5000/api'.
export const API_BASE = '/api';

const handleResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type");
    if (!contentType || contentType.indexOf("application/json") === -1) {
         const text = await res.text();
         // If it's a 404 HTML response, it likely means backend is down or route is wrong.
         // We throw a specific error that can be caught gracefully.
         throw new Error(`Server error: ${res.status} ${res.statusText} (${text.substring(0, 100)})`);
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
};

export const api = {
    async register(email: string, password: string, name: string): Promise<User> {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        return handleResponse(res);
    },

    async login(email: string, password: string): Promise<User> {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(res);
    },

    async googleLogin(email: string, name: string, googleId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, googleId }),
        });
        return handleResponse(res);
    },

    async markMastered(userId: string, masteredId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/user/progress/mastered`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, masteredId }),
        });
        return handleResponse(res);
    },

    async markReviewed(userId: string, reviewedId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/user/progress/reviewed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, reviewedId }),
        });
        return handleResponse(res);
    },

    async processPaymentSuccess(userId: string): Promise<User> {
        const res = await fetch(`${API_BASE}/payment/success`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });
        return handleResponse(res);
    },

    // --- Admin & Content ---

    async getDBQuestions(): Promise<Question[]> {
        try {
            const res = await fetch(`${API_BASE}/questions`);
            // Gracefully handle if backend is not running or route is missing (404)
            if (res.status === 404 || res.status === 502 || res.status === 504) {
                console.warn("Backend questions not available, using static only.");
                return [];
            }
            return await handleResponse(res);
        } catch (e) {
            console.warn("Could not fetch DB questions (Backend might be down):", e);
            return []; // Return empty array so app continues with static questions
        }
    },

    async addAdmin(email: string): Promise<void> {
        const res = await fetch(`${API_BASE}/admin/promote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return handleResponse(res);
    },

    async getContributions(): Promise<Contribution[]> {
        const res = await fetch(`${API_BASE}/admin/contributions`);
        return handleResponse(res);
    },

    async updateContribution(id: string, data: any): Promise<void> {
        const res = await fetch(`${API_BASE}/admin/contributions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
        });
        return handleResponse(res);
    },

    async deleteContribution(id: string): Promise<void> {
        const res = await fetch(`${API_BASE}/admin/contributions/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(res);
    },

    async approveContribution(id: string): Promise<void> {
        const res = await fetch(`${API_BASE}/admin/contributions/${id}/approve`, {
            method: 'POST',
        });
        return handleResponse(res);
    }
};