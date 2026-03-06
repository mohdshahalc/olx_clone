import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ProductCard from "../components/ProductCard";

const MyProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchMyProducts = async () => {
      try {
        const res = await API.get("/products/my-products");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Backend did not return an array:", res.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to load products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [navigate]);



  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Loading your listings...
      </p>
    );
  }


  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h2 style={{ marginBottom: "30px" }}>My Listings</h2>

      {products.length === 0 ? (
        <p>You have not posted any products yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} style={{ position: "relative" }}>


              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;