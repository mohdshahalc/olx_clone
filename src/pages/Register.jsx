import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Auth.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "buyer"
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
            const res = await API.post("/auth/register", formData);

            setMessage(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ width: "100%", maxWidth: "600px", boxShadow: "none", border: "none" }}>
                <div className="auth-logo">
                    <h2>Create an account</h2>
                    <p className="auth-subtitle">Join OLX to buy and sell instantly</p>
                </div>

                {message && (
                    <div style={{ padding: '12px', backgroundColor: '#fff0f0', color: '#e52323', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>
                        {message}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            required
                            onChange={handleChange}
                        />
                    </div>

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
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a strong password"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="input-group">
                        <label>Register As</label>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                            <label className="checkbox-container" style={{
                                flex: 1,
                                padding: '12px',
                                border: formData.role === 'buyer' ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                background: formData.role === 'buyer' ? 'rgba(0, 164, 159, 0.05)' : 'var(--white)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="buyer"
                                    checked={formData.role === "buyer"}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ fontWeight: formData.role === 'buyer' ? '700' : '500', color: formData.role === 'buyer' ? 'var(--primary-color)' : 'var(--text-dark)' }}>Buyer</span>
                            </label>

                            <label className="checkbox-container" style={{
                                flex: 1,
                                padding: '12px',
                                border: formData.role === 'seller' ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                background: formData.role === 'seller' ? 'rgba(0, 164, 159, 0.05)' : 'var(--white)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="seller"
                                    checked={formData.role === "seller"}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ fontWeight: formData.role === 'seller' ? '700' : '500', color: formData.role === 'seller' ? 'var(--primary-color)' : 'var(--text-dark)' }}>Seller</span>
                            </label>
                        </div>

                        <div style={{
                            fontSize: "12px",
                            color: "var(--text-light)",
                            marginTop: "8px",
                            lineHeight: "1.5",
                            padding: "8px 12px",
                            background: "var(--hover-bg)",
                            borderRadius: "6px",
                            borderLeft: "3px solid var(--primary-color)"
                        }}>
                            {formData.role === "buyer" &&
                                "As a Buyer, you can browse listings, connect with sellers, and purchase products securely."}

                            {formData.role === "seller" &&
                                "As a Seller, you can create product listings, manage your items for sale, and also purchase from other sellers."}
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" style={{ marginTop: '8px' }}>
                        Create Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;