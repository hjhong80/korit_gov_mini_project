import { create } from 'zustand';

export const usePrincipalState = create((set, get) => ({
    isLoggedIn: false,
    principal: null,
    loading: true,
    login: (data) => set({ isLoggedIn: true, principal: data }),
    logout: () => {
        localStorage.removeItem('AccessToken');
        set({ isLoggedIn: false, principal: null });
        window.location.href = '/auth/signin';
    },
    setLoading: (isLoading) =>
        set({
            isLoggedIn: get().isLoggedIn,
            principal: get().principal,
            loading: isLoading,
        }),
}));
