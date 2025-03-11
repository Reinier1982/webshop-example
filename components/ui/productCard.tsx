import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Product } from "../shared/types";
import { useCart } from "@/lib/store";
import { useEffect } from "react";

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  const image = product.images[0];

  const { addCartItem, cartItems, setCartItems } = useCart();

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      setCartItems(parsedCartItems);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <Card>
      <CardHeader className="relative items-center justify-center max-h-[250px]">
        <span className="absolute top-3 left-3 bg-red-600 p-[6px] rounded-lg shadow-sm text-white uppercase text-[12px] font-bold">
          {product.category}
        </span>
        <Image
          src={image}
          alt={product.title}
          width={250}
          height={250}
          className="max-h-[250px]"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="mr-4">€ {product.price}</span>
        <button
          className="p-2 border-2 rounded-lg shadow-sm"
          onClick={() => {
            addCartItem(product);
          }}
        >
          Add to cart
        </button>
      </CardFooter>
    </Card>
  );
}
