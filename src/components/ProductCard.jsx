import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {

  const imageSrc = product.image
    ? `https://olx-clone-fmky.onrender.com/uploads/${product.image}`
    : "/placeholder.jpg"; // optional static fallback

  return (
    <Link to={`/product/${product._id}`} className="product-card">

      <div className="card-image">
        <img src={imageSrc} alt={product.title} />
      </div>

      <div className="card-content">

        <h3 className="card-price">
          ₹ {product.price?.toLocaleString()}
        </h3>

        <p className="card-title">
          {product.title}
        </p>

        {/* 🔥 Seller from backend */}
        {product.seller && (
          <p className="card-seller">
            Seller: {product.seller.name}
          </p>
        )}

        <div className="card-footer">
          <span className="card-date">
            {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;