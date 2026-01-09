import type { OrderItem, SelectedProduct } from "@/types";
import { create } from "zustand";

type Store = {
    isOrderDrawerOpen: boolean;
    orders: OrderItem[];
    toggleOrderDrawer: () => void;
    addItem: (product: SelectedProduct) => void;
};

export const useOrderStore = create<Store>((set, get) => ({
    isOrderDrawerOpen: false,
    orders: [],
    toggleOrderDrawer: () => {
        set({ isOrderDrawerOpen: !get().isOrderDrawerOpen });
    },
    addItem: (product) => {
        const currentOrders = get().orders;

        const newOrder = {
            ...product,
            quantity: 1,
            subtotal: product.price,
        };

        set({ orders: [...currentOrders, newOrder] });

        console.log(get().orders);
    },
}));
