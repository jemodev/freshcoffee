import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useOrderStore } from "@/store/order.ts";

export default function ShowOrderButton() {
    const { toggleOrderDrawer, orders } = useOrderStore();

    const totalItems = orders.reduce((acc, order) => acc + order.quantity, 0);

    return (
        <button
            type="button"
            className="cursor-pointer p-4 flex items-center gap-3"
            onClick={toggleOrderDrawer}
        >
            <ShoppingCartIcon className="size-8 text-gray-700 hover:text-gray-900" />
            {totalItems > 0 && (
                <span className="ml-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-bold text-white">
                    {totalItems}
                </span>
            )}
        </button>
    );
}
