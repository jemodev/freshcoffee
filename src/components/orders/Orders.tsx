import { useOrderStore } from "@/store/order";
import ProductDetails from "./ProductDetails";

export default function Orders() {
    const { orders } = useOrderStore();
    console.log(orders);
    return (
        <>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500 py-10 text-xl">
                    No hay productos en el pedido.
                </p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Ajusta tu pedido
                    </h2>

                    {orders.map((order) => {
                        return <ProductDetails key={order.id} order={order} />;
                    })}
                </>
            )}
        </>
    );
}
