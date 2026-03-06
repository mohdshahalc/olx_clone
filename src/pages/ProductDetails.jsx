import { useState, useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import API from "../api";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const isOwner = product?.seller?._id === userId;
    const [showPhone, setShowPhone] = useState(false);

    const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
        await API.delete(`/products/${product._id}`);
        navigate("/my-products");
    } catch (error) {
        console.error("Delete failed", error);
    }
};

     const fetchProduct = async () => {
            try {
                const response = await API.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError(err.response?.data?.message || "Product not found");
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "var(--text-light)" }}>
                Loading product details...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
                <h2 style={{ color: "red", marginBottom: "16px" }}>Error</h2>
                <p style={{ color: "var(--text-light)", marginBottom: "24px" }}>{error}</p>
                <Link to="/" style={{ color: "var(--primary-color)", fontWeight: "bold", textDecoration: "underline" }}>
                    Return to Home
                </Link>
            </div>
        );
    }

    const imageSrc = product.image
        ? `https://olx-clone-fmky.onrender.com/uploads/${product.image}`
        : "/placeholder.jpg";

    return (
        <div className="container product-details-container">
            {/* Left Column: Image & Description */}
            <div className="product-left-col">
                {/* Image Container */}
                <div className="product-image-box">
                    <div className="product-image-inner">
                        <img
                            src={imageSrc}
                            alt={product.title}
                            className="product-img"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder.jpg";
                            }}
                        />
                        <button className="like-btn-overlay" aria-label="Add to favorites">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Description Box */}
                <div className="product-desc-box">
                    <h2 className="desc-title">Description</h2>
                    <p className="desc-text">{product.description || "No description provided."}</p>
                </div>
            </div>

            {/* Right Column: Price & Seller info */}
            <div className="product-right-col">
                {/* Pricing Box */}
                <div className="pricing-box">
                    <h1 className="pricing-price">₹ {product.price?.toLocaleString()}</h1>
                    <p className="pricing-title">{product.title}</p>

                    <div className="pricing-meta">
                        <span className="location">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            Location, IN
                        </span>
                        <span>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "Today"}</span>
                    </div>
                </div>

                {/* Seller Box */}
                <div className="seller-box">
                    <h3 className="seller-box-title">Seller Description</h3>
                    <div className="seller-info">
                        <div className="seller-avatar">
                            {product.seller?.name ? product.seller.name.charAt(0) : "S"}
                        </div>
                        <div>
                            <p className="seller-name">{product.seller?.name || "Seller"}</p>
                            <p className="seller-member-since">Member since {product.seller?.createdAt ? new Date(product.seller.createdAt).getFullYear() : "2024"}</p>
                        </div>
                        <div className="seller-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                 {isOwner ? (
  <button
    className="chat-btn"
    onClick={handleDelete}
    style={{ background: "#ff4d4f" }}
  >
    Delete Product
  </button>
) : (
  <>
    {!showPhone ? (
      <button
        className="chat-btn"
        onClick={() => setShowPhone(true)}
      >
        Show Phone Number
      </button>
    ) : (
      <a
        href={`tel:${product.seller?.phone}`}
        className="chat-btn"
        style={{ display: "block", textAlign: "center" }}
      >
        Call: {product.seller?.phone}
      </a>
    )}
  </>
)}
                </div>

                {/* Safety Box */}
                <div className="safety-box">
                    <h3 className="safety-title">Your safety matters to us</h3>
                    <ul className="safety-list">
                        <li>Only meet in public / crowded places</li>
                        <li>Never go alone to meet a buyer / seller, always take someone with you.</li>
                        <li>Check and inspect the product properly before purchasing it.</li>
                        <li>Never pay anything in advance or transfer money before inspecting the product.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
