"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { useState } from "react";
import Link from "next/link";

export default function Cart(item: Number) {
  const [openCart, setOpenCart] = useState(false);
  const { cartItems, removeCartItem, setCartItems } = useCart();

  return (
    <div className="relative">
      <ShoppingCart
        onClick={() => {
          setOpenCart(!openCart);
        }}
      />
      {openCart && (
        <div className="absolute left-0 top-7 bg-white shadow-lg p-4 w-[400px] z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cart</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setOpenCart(false)}
            >
              Close
            </button>
          </div>
          <div className="mt-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div className="grid grid-cols-6 text-gray-500" key={index}>
                  <div className="col-span-1">{item.number}x</div>
                  <div className="col-span-4"> {item.title}</div>
                  <div className="col-span-1">
                    <button
                      className="text-gray-400 text-[10px] border border-gray-400 px-[2px] py-[2px] rounded-md ml-6 hover:text-gray-700"
                      onClick={() => removeCartItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            <div className="mt-6 text-right">
              <Link
                href="/cart"
                className="mt-8 text-xs text-white bg-blue-700 border-blue-300 p-2 rounded-md hover:bg-blue-800"
              >
                Open Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
