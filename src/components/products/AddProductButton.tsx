import { useOrderStore } from "@/store/order";
import type { SelectedProduct } from "@/types";
import { toast } from "react-toastify";

type Props = {
    product: SelectedProduct;
};

export default function AddProductButton({ product }: Props) {
    const { addItem } = useOrderStore();

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        addItem(product);
        toast.success("Producto agregado al pedido");
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
