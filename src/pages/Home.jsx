import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api";
import "./Home.css";

function Home({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch products from the backend
  const getProducts = async () => {
    try {
      // 1. Show the "Loading products..." message
      setLoading(true);

      // 2. Ask the backend for products based on the search, category, or sort
      const response = await API.get("/products", {
        params: {
          category: category,    // Send the chosen category
          sort: sort,            // Send the chosen sorting option
          search: searchQuery    // Send the typed search text
        }
      });

      // 3. Save the actual products we got back from the backend
      setProducts(response.data);

    } catch (error) {
      // If something goes wrong (like no internet), log the error
      console.error("Failed to fetch products:", error);
    } finally {
      // 4. Hide the loading message, whether it succeeded or failed
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category, sort, searchQuery]);

  return (
    <div className="home-page">

      {/* Categories Bar */}
      <div className="categories-bar">
        <ul className="categories-list container">
          <li
            className={!category ? "active" : ""}
            onClick={() => setCategory("")}
          >
            <b>ALL CATEGORIES</b>
          </li>

          <li onClick={() => setCategory("mobile")}>Mobiles</li>
          <li onClick={() => setCategory("electronics")}>Electronics</li>
          <li onClick={() => setCategory("vehicles")}>Vehicles</li>
          <li onClick={() => setCategory("furniture")}>Furniture</li>
          <li onClick={() => setCategory("property")}>Properties</li>
          <li onClick={() => setCategory("fashion")}>Fashion</li>
          <li onClick={() => setCategory("books")}>Books</li>
        </ul>
      </div>

      <div className="home-container container">

        {/* Header + Filters */}
        <div className="home-header">
          <h2 className="section-title">
            {searchQuery ? `Search results for: "${searchQuery}"` : "Fresh Recommendations"}
          </h2>

          <div className="filters">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="mobile">Mobiles</option>
              <option value="electronics">Electronics</option>
              <option value="vehicles">Vehicles</option>
              <option value="furniture">Furniture</option>
              <option value="property">Properties</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort by Relevance</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            Loading products...
          </p>
        )}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            No products found.
          </p>
        )}

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;