import type { OrderItem, SelectedProduct } from "@/types";
import { create } from "zustand";

type Store = {
    orders: OrderItem[];
    addItem: (product: SelectedProduct) => void;
};

export const useOrderStore = create<Store>((set, get) => ({
    orders: [],
    addItem: (product) => {
        const currentOrders = get().orders;

        const newOrder = {
            ...product,
            quantity: 1,
            subtotal: product.price,
        };

        set({ orders: [...currentOrders, newOrder] });
    },
}));
