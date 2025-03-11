import SearchBar from "./searchBar";
import ProductsOverview from "./productsOverview";
import Paginator from "./paginator";
import CategorySelect from "./categorySelect";
import { getProducts, getCategories } from "@/server/products";

export default async function Products() {
  const initialProducts = await getProducts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-end mb-4">
        <div className="mr-4">
          <CategorySelect initialCategories={categories} />
        </div>
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        <ProductsOverview initialProducts={initialProducts} />
      </div>
      <div className="flex my-4">
        <Paginator />
      </div>
    </div>
  );
}
