import { create } from 'zustand';
import api from './api';

// This store will hold the user state and login/logout functions
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start in loading state to check session

    // Login function
    login: async (username, password) => {
        try {
            const res = await api.post('/auth/login', { username, password });
            set({ user: res.data.user, isAuthenticated: true });
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message);
            throw error; // Re-throw to handle in the component
        }
    },

    // Logout function
    logout: async () => {
        try {
            await api.get('/auth/logout');
            set({ user: null, isAuthenticated: false });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    },

    // Check if session is still valid on page load
    checkAuth: async () => {
        try {
            const res = await api.get('/auth/session');
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            // Not authenticated
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },
}));

// Run checkAuth once when the app loads
useAuthStore.getState().checkAuth();