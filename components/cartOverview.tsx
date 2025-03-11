"use client";
import { useCart } from "@/lib/store";
import { Plus, Minus } from "lucide-react";
import { getProduct } from "@/server/products";

export default function CartOverview() {
  const { cartItems, removeCartItem, addCartItem } = useCart();

  const AddCartItem = async (item: Number) => {
    const product = await getProduct(item);
    addCartItem(product);
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.price * item.number;
  }, 0);

  return (
    <div className="container mx-auto mt-12">
      <div className="w-1/2 mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-4">Cart</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div className="grid grid-cols-9 my-1" key={index}>
              <div className="text-black">{item.number}x</div>
              <div className="col-span-4"> {item.title}</div>
              <div className="col-span-2 text-right">
                € {(item.price * item.number).toFixed(2)}
              </div>
              <div className="col-span-2">
                <button
                  className="text-gray-400 text-[10px] border border-gray-400 p-1 rounded-full ml-6 hover:text-gray-700"
                  onClick={() => AddCartItem(item.id)}
                >
                  <Plus size={14} />
                </button>
                <button
                  className=" text-gray-400 text-[10px] border border-gray-400 p-1 rounded-full ml-6 hover:text-gray-700"
                  onClick={() => removeCartItem(item.id)}
                >
                  <Minus size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
        {cartItems.length > 0 && (
          <div className="grid grid-cols-9 my-1">
            <div className="col-start-5 col-end-6">
              <b>Total</b>
            </div>
            <div className="col-span-2 text-right">
              <b>€ {totalAmount.toFixed(2)}</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
