import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchProducts } from "../app/slices/productSlice";

const SearchResult = () => {
  const { searchTerms } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productsList);
  const loading = useSelector((state) => state.products.isLoading);
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    if (searchTerms) {
      dispatch(searchProducts(searchTerms));
    }
  }, [searchTerms, dispatch]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const sortedProducts = products && products.products ? [...products.products].sort((a, b) => {
    if (sortOption === "Price: High to Low") {
      return b.price - a.price;
    } else if (sortOption === "Price: Low to High") {
      return a.price - b.price;
    }
    return 0;
  }) : [];

  const filteredProducts = sortedProducts.filter((product) => {
    if (priceRange === "₹5000 - ₹10,000") {
      return product.price >= 5000 && product.price <= 10000;
    } else if (priceRange === "₹10,000 - ₹20,000") {
      return product.price >= 10000 && product.price <= 20000;
    } else if (priceRange === "₹20,000 - ₹50,000") {
      return product.price >= 20000 && product.price <= 50000;
    }
    return true;
  });

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mx-28 my-10">
        <div>
          <p className="font-semibold">Search Results for "{searchTerms}"</p>
        </div>
        <div className="flex gap-3">
          <div className="font-semibold text-white">
            <select
              className="select select-info w-full rounded-full bg-slate-700 border-none"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option disabled>Sort by</option>
              <option>All Products</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
          <div className="font-semibold text-white">
            <select
              className="select select-info w-full rounded-full bg-slate-700 border-none"
              value={priceRange}
              onChange={handlePriceRangeChange}
            >
              <option disabled>Sort by Prices</option>
              <option>Reset Prices</option>
              <option>₹5000 - ₹10,000</option>
              <option>₹10,000 - ₹20,000</option>
              <option>₹20,000 - ₹50,000</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="my-10 absolute left-1/2">
            <span className="loading loading-ring loading-lg bg-sky-600"></span>
          </div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={`http://localhost:3500/images/${product.images[1].image}`}
                alt={product.name}
                className="rounded-box mb-6"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold">₹{product.price}</p>
              <Link
                to={`/resultdetails/${product._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="flex absolute right-1/2 mt-20">
            <p className="font-mono font-semibold text-red-600 text-2xl">Result Not Found!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResult;
