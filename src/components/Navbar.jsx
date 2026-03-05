import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = ({ setSearchQuery }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [localSearch, setLocalSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setRole(userRole);
  }, [location]);

  return (
    <nav className="simple-navbar">

      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <h2>OLX Clone</h2>
        </Link>
      </div>

      {/* Search */}
      <div className="navbar-center" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

        {/* Simple Home Text Link placed left of search bar */}
        <Link
          to="/"
          className="home-link"
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#002f34",
            textDecoration: "underline",
            textUnderlineOffset: "4px"
          }}
        >
          Home
        </Link>

        <input
          type="text"
          placeholder="Find Cars, Mobile Phones and more..."
          value={localSearch}
          onChange={(e) => {
            const val = e.target.value;
            setLocalSearch(val);
            setSearchQuery(val);
          }}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      {/* Right section */}
      <div className="navbar-right">

        <div className="language-selector">
          ENGLISH ▼
        </div>

        {isLoggedIn ? (
          <Link to="/profile" className="auth-link">Profile</Link>
        ) : (
          <Link to="/login" className="auth-link">Login</Link>
        )}

        {/* SHOW SELL ONLY IF SELLER */}
        {isLoggedIn && role === "seller" && (
          <Link to="/create" className="sell-button">
            + SELL
          </Link>
        )}

      </div>
    </nav >
  );
};

export default Navbar;