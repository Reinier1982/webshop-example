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

interface ProductsOverviewProps {
  initialProducts?: Product[];
}

export default function ProductsOverview({
  initialProducts = [],
}: ProductsOverviewProps): JSX.Element {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const skip = searchParams.get("skip") || "";
  const { products, setProducts } = useProductStore();
  const { selectedCategory } = useCategory();

  useEffect(() => {
    if (
      initialProducts &&
      initialProducts.length > 0 &&
      products.length === 0
    ) {
      setProducts(initialProducts);
    }
  }, [initialProducts, products.length, setProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory || search || skip) {
        const fetchedProducts: Product[] = selectedCategory
          ? await getProductByCategory(selectedCategory)
          : search
            ? await getFilteredProducts(search)
            : skip
              ? await getLimitProducts(skip)
              : await getProducts();
        setProducts(fetchedProducts);
      }
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
