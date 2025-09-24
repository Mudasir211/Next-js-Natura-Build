import Image from "next/image";
import Link from "next/link";
import ProductFilters from "@/components/ProductFilters";
import SortDropdown from "@/components/SortDropdown";
import ProductSearch from "@/components/ProductSearch";

async function fetchProducts({ search, categories, sort, bestseller }) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (categories?.length) params.append("category", categories.join(","));
  if (sort) params.append("sort", sort);
  if (bestseller) params.append("bestseller", "true");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const search = searchParams?.search || "";
  const categoryParam = searchParams?.category || "";
  const categoriesSelected = categoryParam ? categoryParam.split(",") : [];
  const sort = searchParams?.sort || "";
  const bestseller = searchParams?.bestseller === "true";

  const [products, categories] = await Promise.all([
    fetchProducts({ search, categories: categoriesSelected, sort, bestseller }),
    fetchCategories(),
  ]);

  // Hero logic
  let heroTitle = "Our Products";
  let heroDescription = "Explore Natura’s premium herbal collection, crafted with natural ingredients for a healthy lifestyle.";

  if (bestseller) {
    heroTitle = "Bestsellers";
    heroDescription = "Check out our top-selling products loved by our customers!";
  } else if (categoriesSelected.length > 0) {
    const currentCategory = categories.find((cat) => cat.slug === categoriesSelected[0]);
    if (currentCategory) {
      heroTitle = currentCategory.name;
      heroDescription = currentCategory.description || `Explore our ${currentCategory.name} collection, crafted with natural ingredients for a healthy lifestyle.`;
    }
  } else if (search) {
    heroTitle = `Search results for "${search}"`;
    heroDescription = `Products matching your search query.`;
  }

  return (
    <section className="bg-gray-50 py-14 text-gray-800">
      {/* Hero */}
      <div className="bg-[#016630] text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">{heroTitle}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">{heroDescription}</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col lg:flex-row gap-10">
        {/* Filters */}
        <ProductFilters categories={categories} selectedCategories={categoriesSelected} />

        {/* Products Column */}
        <div className="flex-1">
             <ProductSearch />
          {/* Sort Dropdown */}
          <SortDropdown />

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-10">
            {products.length > 0 ? (
              products.map((item) => (
                <Link key={item._id} href={`/product/${item._id}`}>
                  <div className="relative flex flex-col items-center gap-3 text-sm cursor-pointer group rounded-xl p-2 bg-white shadow-sm hover:shadow-lg transition duration-300 border border-green-100">
                    {item.bestseller && <span className="absolute top-2 left-2 z-40 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">Bestseller</span>}

                    <div className="relative z-0 w-full h-48 sm:h-auto overflow-hidden rounded-lg">
                      <div className="w-full h-48 lg:h-60 md:h-50 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                        <img src={item.images[0]} alt={item.title} className="h-full w-full object-contain sm:object-contain transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <p className="font-medium text-green-900 group-hover:text-green-700">{item.title}</p>
                      {item.onSale ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-gray-500 line-through text-xs">Rs {item.cuttedPrice}</span>
                          <span className="font-bold text-xs text-green-700">Rs {item.price}</span>
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">-{item.discountPercentage}%</span>
                        </div>
                      ) : (
                        <p className="font-bold text-green-700">Rs {item.price}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
