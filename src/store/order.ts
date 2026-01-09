import type { OrderItem, SelectedProduct } from "@/types";
import { toLowerFirstChar } from "@/utils";
import { create } from "zustand";

type Store = {
    isOrderDrawerOpen: boolean;
    orders: OrderItem[];
    toggleOrderDrawer: () => void;
    addItem: (product: SelectedProduct) => void;
    removeItem: (product: OrderItem) => void;
    increaseItemQuantity: (product: OrderItem) => void;
    decreaseItemQuantity: (product: OrderItem) => void;
};

const findExistingOrder = (product: SelectedProduct, orders: OrderItem[]) => {
    const hasSize = Boolean(product.size);
    const key = hasSize
        ? `${product.id}-${toLowerFirstChar(product.size!)}`
        : undefined;

    const index = orders.findIndex((order) =>
        hasSize ? order.key === key : order.id === product.id
    );

    return { index, key };
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
        const { index: existingOrderIndex, key } = findExistingOrder(
            product,
            currentOrders
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
    removeItem: (product) => {
        const currentOrders = get().orders;

        const { index: existingOrderIndex } = findExistingOrder(
            product,
            currentOrders
        );

        if (existingOrderIndex !== -1) {
            const updatedOrders = [...currentOrders];
            updatedOrders.splice(existingOrderIndex, 1);
            set({ orders: updatedOrders });
            return;
        }
    },
    increaseItemQuantity: (product) => {
        const currentOrders = get().orders;

        const { index: existingOrderIndex } = findExistingOrder(
            product,
            currentOrders
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
    },
    decreaseItemQuantity: (product) => {
        const currentOrders = get().orders;

        const { index: existingOrderIndex } = findExistingOrder(
            product,
            currentOrders
        );

        if (existingOrderIndex !== -1) {
            const updatedOrders = [...currentOrders];
            updatedOrders[existingOrderIndex].quantity -= 1;
            updatedOrders[existingOrderIndex].subtotal =
                updatedOrders[existingOrderIndex].quantity *
                updatedOrders[existingOrderIndex].price;

            if (updatedOrders[existingOrderIndex].quantity === 0) {
                updatedOrders.splice(existingOrderIndex, 1);
            }

            set({ orders: updatedOrders });
            return;
        }
    },
}));
