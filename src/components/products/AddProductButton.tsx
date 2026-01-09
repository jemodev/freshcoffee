import { useOrderStore } from "@/store/order";
import type { SelectedProduct } from "@/types";

type Props = {
    product: SelectedProduct;
};

export default function AddProductButton({ product }: Props) {
    const { addItem } = useOrderStore();

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        addItem(product);
    };

    return (
        <button
            type="button"
            className="bg-black text-lg text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-xl hover:bg-amber-400 transition"
            onClick={handleClick}
        >
            Agregar
        </button>
    );
}
