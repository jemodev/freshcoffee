import { create } from "zustand";

type Store = {
    addItem: () => void;
};

export const useOrderStore = create<Store>((set) => ({
    addItem: () => {
        set((state) => state);
    },
}));
