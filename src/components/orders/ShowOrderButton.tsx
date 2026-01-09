import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useOrderStore } from "@/store/order.ts";

export default function ShowOrderButton() {
    const { toggleOrderDrawer } = useOrderStore();

    return (
        <button
            type="button"
            className="cursor-pointer p-4"
            onClick={toggleOrderDrawer}
        >
            <ShoppingCartIcon className="size-8 text-gray-700 hover:text-gray-900" />
        </button>
    );
}
