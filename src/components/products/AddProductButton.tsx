import type { SelectedProduct } from "@/types";
import React from "react";

type Props = {
    product: SelectedProduct;
};

export default function AddProductButton({ product }: Props) {
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        console.log("Agregando producto", product);
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
