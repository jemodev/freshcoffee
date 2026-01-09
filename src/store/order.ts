import type {
    OrderItem,
    ProductWithVariablePrice,
    SelectedProduct,
} from "@/types";
import { toLowerFirstChar } from "@/utils";
import { string } from "astro:schema";
import { create } from "zustand";

type Store = {
    isOrderDrawerOpen: boolean;
    orders: OrderItem[];
    toggleOrderDrawer: () => void;
    addItem: (product: SelectedProduct) => void;
    removeItem: (product: OrderItem) => void;
    increaseItemQuantity: (product: OrderItem) => void;
    decreaseItemQuantity: (product: OrderItem) => void;
    updateItemSize: (product: OrderItem, size: OrderItem["size"]) => void;
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
    updateItemSize: async (product, newSize) => {
        if (!product.key || !newSize || product.size === newSize) return;

        const res = await fetch(`/api/products/${product.id}`);
        const data = (await res.json()) as ProductWithVariablePrice;

        const updatedData = Object.values(data.acf)
            .filter(
                (value): value is { size: string; price: number } =>
                    typeof value === "object" &&
                    value !== null &&
                    "size" in value &&
                    "price" in value
            )
            .find((item) => item.size === newSize);

        if (!updatedData) return;

        const currentOrders = get().orders;
        const newKey = `${product.id}-${toLowerFirstChar(newSize)}`;
        const isMatch = (order: OrderItem, key: string) => order.key === key;
        const existingOrderIndex = currentOrders.findIndex((order) =>
            isMatch(order, product.key!)
        );
        const existingNewOrderIndex = currentOrders.findIndex((order) =>
            isMatch(order, newKey)
        );

        // If an order with the new size already exists, we can merge them
        if (existingNewOrderIndex !== -1) {
            let updatedOrders = [...currentOrders];

            // Update quantity and subtotal of the existing order with the new size
            updatedOrders[existingNewOrderIndex].quantity +=
                updatedOrders[existingOrderIndex].quantity;
            updatedOrders[existingNewOrderIndex].subtotal =
                updatedOrders[existingNewOrderIndex].quantity *
                updatedOrders[existingNewOrderIndex].price;

            // Remove the old order
            updatedOrders.splice(existingOrderIndex, 1);

            set({ orders: updatedOrders });
            return;
        }

        let updatedOrders = [...currentOrders];
        updatedOrders[existingOrderIndex] = {
            ...product,
            size: newSize,
            key: newKey,
            price: updatedData.price,
            subtotal: updatedData.price * product.quantity,
        };

        set({ orders: updatedOrders });
    },
}));
