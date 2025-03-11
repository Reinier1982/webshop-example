import SearchBar from "./searchBar";

import ProductsOverview from "./productsOverview";
import Paginator from "./paginator";
import CategorySelect from "./categorySelect";

export default async function Products() {
  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-end mb-4">
        <div className="mr-4">
          <CategorySelect />
        </div>
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        <ProductsOverview />
      </div>
      <div className="flex my-4">
        <Paginator />
      </div>
    </div>
  );
}
