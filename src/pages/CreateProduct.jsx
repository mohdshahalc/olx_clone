import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Auth.css";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null
  });

  const [message, setMessage] = useState("");

  // 🔐 Protect route (Only seller)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "seller") {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("image", formData.image);
      data.append("category", formData.category);

      await API.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage("Product posted successfully ✅");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to post product"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "600px" }}>

        <div className="auth-logo" style={{ textAlign: "left", marginBottom: "24px" }}>
          <h2>Post Your Ad</h2>
          <p style={{ fontSize: "14px" }}>Include details to sell it faster</p>
        </div>

        {message && (
          <p style={{ color: "green", marginBottom: "10px" }}>
            {message}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Ad Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Brand, model..."
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Description *</label>
            <textarea
              name="description"
              rows="6"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="input-group">
            <label>Category *</label>
            <select
              name="category"
              required
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>Select category</option>
              <option value="mobile">Mobile</option>
              <option value="electronics">Electronics</option>
              <option value="vehicles">Vehicles</option>
              <option value="furniture">Furniture</option>
              <option value="property">Property</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
            </select>
          </div>

          <div className="input-group">
            <label>Set a Price *</label>
            <input
              type="number"
              name="price"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Upload Photo</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Post Now
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;