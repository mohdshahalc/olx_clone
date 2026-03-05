import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Auth.css";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", formData);

            const { token, user } = res.data;

            // Store token
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.id);
            localStorage.setItem("role", user.role);

            if (user.role === "admin") {
    navigate("/admin");
} else {
    navigate("/");
}

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ width: "100%", maxWidth: "600px", boxShadow: "none", border: "none" }}>
                <div className="auth-logo">
                    <h2>Welcome back</h2>
                    <p className="auth-subtitle">
                        Log in to your OLX account to continue
                    </p>
                </div>

                {message && (
                    <p style={{ color: "red", marginBottom: "10px" }}>
                        {message}
                    </p>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="auth-btn">
                        Log In
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;