import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

import Logo from "../components/Logo";
import Button from "../components/Button";
import InputField from "../components/InputField";

import "../styles/register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const getPasswordStrength = () => {
        let score = 0;
        if(password.length >= 8) score++;
        if(/[A-Z]/.test(password)) score++;
        if(/[a-z]/.test(password)) score++;
        if(/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
        return score;
    };

    const strength = getPasswordStrength();

    const handleRegister = async (e) => {
        e.preventDefault();

        // 1. Check if passwords match before sending to backend
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // 2. Send Data to Node.js Backend
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fullName: name // Mapped your 'name' state to 'fullName'
                }),
            });

            const data = await response.json();

            // 3. Handle Backend Response
            if (response.ok && data.success) {
                alert("Account created successfully!");
                navigate("/"); // Redirect to login
            } else {
                alert("Registration failed: " + data.message); 
            }

        } catch (error) {
            console.error("API Call Error:", error);
            alert("Cannot connect to the Backend server!");
        }
    };

    return (
        <div className="page">
            <div className="background-circle circle1"></div>
            <div className="background-circle circle2"></div>
            <div className="glass-card">
                <Logo />
                <h2 className="title">
                    Create Account
                </h2>
                <p className="subtitle">
                    Join AI Agent today
                </p>
                <form onSubmit={handleRegister}>
                    <InputField
                        icon={<FaUser />}
                        placeholder="Full Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <InputField
                        icon={<FaEnvelope />}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <InputField
                        icon={<FaLock />}
                        type={showPassword ? "text":"password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                        <span
                            className="eye"
                            onClick={()=> setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </span>
                    </InputField>
                    <div className="strength">
                        <div className={`bar ${strength >= 1 ? "active" : ""}`}></div>
                        <div className={`bar ${strength >= 2 ? "active" : ""}`}></div>
                        <div className={`bar ${strength >= 3 ? "active" : ""}`}></div>
                        <div className={`bar ${strength >= 4 ? "active" : ""}`}></div>
                    </div>
                    <InputField
                        icon={<FaLock />}
                        type={showConfirm ? "text":"password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                        <span
                            className="eye"
                            onClick={()=> setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <FaEyeSlash/> : <FaEye/>}
                        </span>
                    </InputField>
                    <div className="confirm-status">
                        {confirmPassword.length > 0 && (
                            password === confirmPassword ? (
                                <span className="success">
                                    <FaCheckCircle /> Password matched
                                </span>
                            ) : (
                                <span className="error">
                                    <FaTimesCircle /> Password not matched
                                </span>
                            )
                        )}
                    </div>
                    <Button
                        text="Create Account"
                        type="submit"
                    />
                </form>
                <p className="bottom-text">
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;