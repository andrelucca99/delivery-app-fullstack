import { create } from "zustand";

type User = {
  id: number;
  name: string;
  role: "CUSTOMER" | "SELLER";
};

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.clear();
    set({ user: null });
  },
}));
