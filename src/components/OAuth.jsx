import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import logo from "../images/image.svg";
import google from "../images/google.png";
import github from "../images/github.png";


const githubClientId = "Ov23liLEdXrl4orBbmkm"; // Replace with your actual GitHub OAuth Client ID
const backendUrl = "https://taskly-backend-rt4v.onrender.com"; // Change to your backend URL

function OAuth() {
    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState("");
    const emailRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current?.focus();
        
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const code = urlParams.get("code"); // Capture GitHub OAuth Code
    
        if (token) {
            localStorage.setItem("token", token);
            navigate("/");
        } 
        else if (code) {
            handleGitHubCallback(code); // Handle GitHub Login
        }
    }, [navigate]);

    const handleGitHubCallback = async (code) => {
        try {
            const res = await fetch(`${backendUrl}/api/auth/github`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });
    
            const data = await res.json();
            console.log("🔍 GitHub Login Response from Backend:", data);
    
            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                console.error("❌ GitHub Login Failed:", data.message);
            }
        } catch (error) {
            console.error("🚨 Error during GitHub login:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ email: e.target.value });
        setError("");
    };

    const handleContinue = (e) => {
        e.preventDefault();
        const email = formData.email.trim();
        if (!email) {
            setError("Please enter an email address");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        navigate(`/signup?email=${encodeURIComponent(email)}`);
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // ✅ Correct Google OAuth Success Handler
    const handleGoogleSuccess = async (tokenResponse) => {
        console.log("✅ Google Response:", tokenResponse);
    
        const token = tokenResponse?.credential; // Ensure `credential` exists
        if (!token) {
            console.error("❌ Google Login Failed: No token provided");
            return;
        }
    
        try {
            const response = await fetch(`${backendUrl}/api/auth/google-verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }), 
            });
    
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("🔍 Google Login Response from Backend:", data);
    
            if (data?.success) {
                console.log("✅ Google Login Successful:", data);
                localStorage.setItem("token", data.token);
                navigate("/"); // Ensure `navigate` is imported
            } else {
                console.error("❌ Google Login Failed:", data?.message || "Unknown error");
            }
        } catch (error) {
            console.error("🚨 Error during Google login:", error.message || error);
        }
    };
    
    

    const login = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => console.error("Google Login Failed"),
    });
    
    

    // GitHub OAuth Login
    const handleGitHubLogin = () => {
        const redirectUri = "https://taskly-backend-rt4v.onrender.com/api/auth/github/callback";
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=user:email&redirect_uri=${redirectUri}`;
    };
    
    

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <div className="mt-0">
                <div className="flex justify-center items-center">
                    <div className="w-[70%]">
                        <img src={logo} className="object-cover w-full" alt="Logo" />
                    </div>
                </div>

                <div className="flex flex-col gap-5 mt-5 text-left">
                    {/* ✅ Use GoogleLogin instead of useGoogleLogin */}
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.error("Google Login Failed")}
                        />
                    <OAuthButton imgSrc={github} text="Continue with GitHub" onClick={handleGitHubLogin} />

                    <div className="flex justify-between items-center w-full mt-5">
                        <span className="w-full border-t border-[#633bc0]"></span>
                        <span className="w-[5%] mx-3 flex justify-center items-center">or</span>
                        <span className="w-full border-t border-[#633bc0]"></span>
                    </div>

                    <div className="flex items-center justify-start w-full">
                        <form className="w-full">
                            <label htmlFor="email" className="flex justify-start items-start">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                ref={emailRef}
                                onChange={handleChange}
                                className="bg-white border-[1px] border-[#1e293b] rounded-md py-2 px-4 w-full mt-2 focus:outline-none"
                            />
                            {error && <p className="text-red-900 text-xs mt-2">{error}</p>}
                        </form>
                    </div>

                    <button onClick={handleContinue} className="text-white bg-gradient-to-r from-[#633bc0] to-[#663bca] py-3 px-14 rounded-md">
                        Continue to create an account
                    </button>

                    <div className="flex justify-center items-center">
                        <span>Already have an account?</span>
                        <Link to="/login" className="font-semibold text-[#633bc0] cursor-pointer ml-1">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const OAuthButton = ({ imgSrc, text, onClick }) => (
    <div onClick={onClick} className="text-[#1e293b] flex justify-start items-center w-full cursor-pointer">
        <div className="flex gap-3 items-center justify-center border-[1px] border-[#633bc0] py-3 px-14 rounded-md w-full">
            <div className="flex justify-center items-center w-6 h-6">
                <img src={imgSrc} alt={text} className="object-contain w-full h-full" />
            </div>
            <div className="text-sm">{text}</div>
        </div>
    </div>
);

export default OAuth;
