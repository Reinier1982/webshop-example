"use server";
import { Product, Category } from "@/components/shared/types";

export async function getProducts(): Promise<Product[]> {
  console.log("blaap1");
  const res = await fetch("https://dummyjson.com/products?limit=8&skip=0");
  const products = await res.json();
  return products.products;
}

export async function getProduct(id: Number): Promise<Product> {
  const res = await fetch("https://dummyjson.com/products/" + id);
  const product = await res.json();
  return product;
}

export async function getLimitProducts(skip: string): Promise<Product[]> {
  const calc_skip = Number(skip) * 8;
  const res = await fetch(
    "https://dummyjson.com/products?limit=8&skip=" + calc_skip
  );
  const products = await res.json();
  return products.products;
}

export async function getFilteredProducts(query: string): Promise<Product[]> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const products = await res.json();
  return products.products;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("https://dummyjson.com/products/categories");
  const categories = await res.json();
  return categories;
}

export async function getProductByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(
    "https://dummyjson.com/products/category/" + category
  );

  const products = await res.json();
  return products.products;
}
