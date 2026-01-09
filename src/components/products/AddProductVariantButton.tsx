import { useOrderStore } from "@/store/order";
import type { SelectedProduct } from "@/types";

type Props = {
    product: SelectedProduct;
};

export default function AddProductVariantButton({ product }: Props) {
    const { addItem } = useOrderStore();

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        addItem();
    };

    return (
        <button
            type="button"
            className="bg-black text-lg text-white w-full leading-2 p-3 uppercase font-bold cursor-pointer rounded-xl hover:bg-amber-400 transition"
            onClick={handleClick}
        >
            +
        </button>
    );
}
