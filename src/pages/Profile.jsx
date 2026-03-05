import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);

        // 🔥 Store role for Navbar usage
        localStorage.setItem("role", res.data.role);

      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleRoleChange = async () => {
    try {
      const res = await API.put("/auth/change-role");

      // Update state
      setUser({ ...user, role: res.data.role });

      // Update localStorage for Navbar
      localStorage.setItem("role", res.data.role);
      window.location.reload();


    } catch (error) {
      console.error("Failed to update role");
    }
  };

  if (!user) {
    return (
      <div className="profile-container" style={{ alignItems: 'flex-start' }}>
        <p style={{ textAlign: "center", marginTop: "50px", color: 'var(--text-light)', fontSize: '18px' }}>
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card" style={{ width: "100%", maxWidth: "600px", boxShadow: "none", border: "none" }}>

        <h2>My Profile</h2>

        <div className="profile-info">
          <p><strong>Name</strong> <span>{user.name}</span></p>
          <p><strong>Email</strong> <span>{user.email}</span></p>
          <p><strong>Account Type</strong> <span><span style={{
            background: user.role === 'seller' ? 'var(--accent-color)' : 'var(--border-color)',
            color: user.role === 'seller' ? 'white' : 'var(--text-dark)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>{user.role.toUpperCase()}</span></span></p>
          <p><strong>Member Since</strong> <span>{new Date(user.createdAt).toDateString()}</span></p>
        </div>

        <div className="profile-features">
          <h3>Manage</h3>

          {user.role === "seller" && (
  <button className="feature-btn" onClick={() => navigate("/my-products")}>
    My Listings
  </button>
)}


          {/* 🔥 Only Buyer Sees Upgrade Button */}
          {user.role === "buyer" && (
            <button
              className="feature-btn primary-action"
              onClick={handleRoleChange}
            >
              Become a Seller
            </button>
          )}

          {/* 🔥 Only Seller Sees Post Product */}
          {user.role === "seller" && (
            <button className="feature-btn primary-action" onClick={() => navigate("/create")}>
              Post New Product
            </button>
          )}
        </div>

        <hr />

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;