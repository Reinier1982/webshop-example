"use client";
import { JSX, useEffect, useState } from "react";
import ProductCard from "./ui/productCard";
import { useSearchParams } from "next/navigation";
import {
  getProducts,
  getFilteredProducts,
  getLimitProducts,
  getProductByCategory,
} from "@/server/products";
import { Product } from "./shared/types";
import { useProductStore, useCategory } from "@/lib/store";

export default function ProductsOverview(): JSX.Element {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const skip = searchParams.get("skip") || "";
  const { products, setProducts } = useProductStore();
  const { selectedCategory } = useCategory();
  console.log("Hier?");
  useEffect(() => {
    console.log("running");
    const fetchProducts = async () => {
      console.log("fetching products");
      const fetchedProducts: Product[] = selectedCategory
        ? await getProductByCategory(selectedCategory)
        : search
        ? await getFilteredProducts(search)
        : skip
        ? await getLimitProducts(skip)
        : await getProducts();
      console.log("fetched products", JSON.stringify(fetchedProducts));
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, [search, skip, selectedCategory, setProducts]);
  console.log({ products });

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
