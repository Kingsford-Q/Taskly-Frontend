import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/image.svg';
import google from '../images/google.png';
import github from '../images/github.png';

function OAuth() {
    const [formData, setFormData] = useState({ email: '' });
    const [error, setError] = useState('');
    const emailRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        setFormData({ email: e.target.value });
        setError(''); // Clear error when user starts typing
    };

    const handleContinue = (e) => {
        e.preventDefault();

        const email = formData.email.trim();
        if (!email) {
            setError('Please enter an email address');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        navigate(`/signup?email=${encodeURIComponent(email)}`);
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <div className="mt-0">
                {/* Logo */}
                <div className="flex justify-center items-center">
                    <div className="w-[70%]">
                        <img src={logo} className="object-cover w-full" alt="Logo" />
                    </div>
                </div>

                {/* OAuth Options */}
                <div className="flex flex-col gap-5 mt-5 text-left">
                    <OAuthButton imgSrc={google} text="Continue with Google" />
                    <OAuthButton imgSrc={github} text="Continue with GitHub" />

                    {/* Divider */}
                    <div className="flex justify-between items-center w-full mt-5">
                        <span className="w-full border-t border-[#633bc0]"></span>
                        <span className="w-[5%] mx-3 flex justify-center items-center">or</span>
                        <span className="w-full border-t border-[#633bc0]"></span>
                    </div>

                    {/* Email Input */}
                    <div className="flex items-center justify-start w-full">
                        <form className="w-full">
                            <label htmlFor="email" className="flex justify-start items-start">
                                Email
                            </label>
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

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        className="text-white bg-gradient-to-r from-[#633bc0] to-[#663bca] py-3 px-14 rounded-md flex items-center justify-center hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#209971] transition-colors duration-200 mt-3"
                    >
                        Continue to create an account
                    </button>

                    {/* Login Link */}
                    <div className="flex justify-center items-center">
                        <span>Already have an account? </span>
                        <Link to="/login" className="font-semibold text-[#633bc0] cursor-pointer ml-1">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable OAuth Button Component
const OAuthButton = ({ imgSrc, text }) => (
    <div className="text-[#1e293b] flex justify-start items-center w-full">
        <div className="flex gap-3 items-center justify-center border-[1px] border-[#633bc0] py-3 px-14 rounded-md w-full hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#209971] transition-colors duration-200 hover:text-white">
            <div className="flex justify-center items-center w-6 h-6">
                <img src={imgSrc} alt={text} className="object-contain w-full h-full" />
            </div>
            <div className="text-sm">{text}</div>
        </div>
    </div>
);

export default OAuth;
