import { useEffect, useState } from "react";
import API from "../api";
import "./AdminDashboard.css";

const Admin = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error("Backend did not return an array:", res.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to load products");
      setProducts([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      setProducts(products.filter((p) => p._id !== id));

    } catch (error) {
      console.error("Delete failed");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image ? `https://olx-clone-fmky.onrender.com/uploads/${product.image}` : "/placeholder.jpg"}
                    alt={product.title}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>₹{product.price}</td>

                <td>{product.seller?.name}</td>
                <td>{product.seller?.email}</td>

                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn-delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;