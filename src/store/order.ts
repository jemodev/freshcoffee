import type { OrderItem, SelectedProduct } from "@/types";
import { toLowerFirstChar } from "@/utils";
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

        // Check if the product with the same id and size already exists
        const hasSize = Boolean(product.size);
        const key = hasSize
            ? `${product.id}-${toLowerFirstChar(product.size!)}`
            : undefined;

        const existingOrderIndex = currentOrders.findIndex((order) =>
            hasSize ? order.key === key : order.id === product.id
        );

        if (existingOrderIndex !== -1) {
            const updatedOrders = [...currentOrders];
            updatedOrders[existingOrderIndex].quantity += 1;
            updatedOrders[existingOrderIndex].subtotal =
                updatedOrders[existingOrderIndex].quantity *
                updatedOrders[existingOrderIndex].price;
            set({ orders: updatedOrders });
            return;
        }

        const newOrder = {
            ...product,
            quantity: 1,
            subtotal: product.price,
            key,
        };

        set({ orders: [...currentOrders, newOrder] });

        console.log(get().orders);
    },
}));
