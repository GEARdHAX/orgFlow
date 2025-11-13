import { create } from 'zustand';
import api from './api';

export const useAuthStore = create((set) => ({

    user: null,
    isAuthenticated: false,
    isLoading: true,   // App loads in "Checking Session" state

    // --------------------
    // LOGIN
    // --------------------
    login: async (username, password) => {
        try {
            const res = await api.post(
                '/auth/login',
                { username, password },
                { withCredentials: true } // IMPORTANT: forces cookie to be sent
            );

            set({
                user: res.data.user,
                isAuthenticated: true,
            });
        } catch (err) {
            console.error("Login failed:", err.response?.data || err);
            throw err;
        }
    },

    // --------------------
    // LOGOUT
    // --------------------
    logout: async () => {
        try {
            await api.get('/auth/logout', { withCredentials: true });

            set({
                user: null,
                isAuthenticated: false
            });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    },

    // --------------------
    // SESSION CHECK
    // --------------------
    checkAuth: async () => {
        try {
            const res = await api.get('/auth/session', {
                withCredentials: true
            });

            set({
                user: res.data.user,
                isAuthenticated: true,
                isLoading: false,
            });

        } catch (err) {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },
}));

// Run checkAuth one time globally
useAuthStore.getState().checkAuth();
