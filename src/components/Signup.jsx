import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../images/image.svg';

function Signup() {

    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const emailFromURL = params.get("email") || "";

    const [formData, setFormData] = useState({
            name: '',
            email: emailFromURL, 
            password: '',
            confirmPassword: ''
        });
    
        const emailRef = useRef(null);
    
        useEffect(() => {
            if (emailFromURL) {
                setFormData((prevData) => ({ ...prevData, email: emailFromURL }));
            }
            emailRef.current?.focus();
        }, [emailFromURL]);

        const [error, setError] = useState('');
        const [isLoading, setLoading] = useState(false);
        const [isSignUpSuccessfull, setIsSignUpSuccessful] = useState(false);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData, 
                [name]: value 
            }));
        };


        const handleSignUpSubmit = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLoading(true);
            setError('');
            setIsSignUpSuccessful(false);

            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long.');
                setLoading(false);
                return;
            }
        
            if (formData.confirmPassword !== formData.password){
                setError('Passwords do not match, please try again.');
                setLoading(false);
                return;
            }
        
            try {
                const response = await fetch(`${API_BASE_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                }), });
        
        
                const data = await response.json();
                console.log(data);
        
                if (response.ok) {
                    setIsSignUpSuccessful(true);
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                    setTimeout(() => {
                        navigate('/login');
                        setIsSignUpSuccessful(false);
                    }, 1000);
                } else {
                    setError(data?.message || 'Signup failed');
                }
            } catch (error) {
                console.log(error.message);
                setError('Something went wrong, try again.');
        
            } finally {
                setLoading(false);
            }
        };

    return(
        <>

        <div className = 'flex justify-center items-center h-screen flex-col'>  

            <div className = 'mt-0'>
                <div className = 'flex justify-center items-center'>
                    <div className = 'w-[70%]'>
                        <img src = {logo} className = 'object-cover w-full'/>
                    </div>
                </div>

                <div className = 'flex flex-col justify-center items-center'>

                    <form className = 'w-full flex flex-col gap-4' onSubmit={handleSignUpSubmit}>

                        {isSignUpSuccessfull && (
                            <p className='bg-green-400 text-white p-2 text-center rounded-md'>
                                Signup Successful!
                            </p>
                        )}


                        <div className = ''>
                            <label htmlFor = 'name' className = 'flex justify-start items-start'>Full Name</label>
                            <input 
                                type = 'text'
                                name = 'name'
                                value = {formData.name}
                                onChange = {handleChange}
                                required
                                className = 'bg-white border-[1px] border-[#1e293b] rounded-md py-2 px-4 w-full mt-2 focus:outline-none'
                            />
                        </div>

                        <div className = ''>
                            <label htmlFor = 'email' className = 'flex justify-start items-start'>Email</label>
                            <input 
                                type = 'email'
                                name = 'email'
                                value = {formData.email}
                                ref = {emailRef}
                                onChange = {handleChange}
                                required
                                className = 'bg-white border-[1px] border-[#1e293b] rounded-md py-2 px-4 w-full mt-2 focus:outline-none'
                            />
                        </div>

                        <div className = ''>
                            <label htmlFor = 'password' className = 'flex justify-start items-start'>Password</label>
                            <input 
                                type = 'password'
                                name = 'password'
                                value = {formData.password}
                                onChange = {handleChange}
                                required
                                className = 'bg-white border-[1px] border-[#1e293b] rounded-md py-2 px-4 w-full mt-2 focus:outline-none'
                            />
                        </div>

                        <div className = ''>
                            <label htmlFor = 'confirmPassword' className = 'flex justify-start items-start'>Confirm Password</label>
                            <input 
                                type = 'password'
                                name = 'confirmPassword'
                                value = {formData.confirmPassword}
                                onChange = {handleChange}
                                required
                                className = 'bg-white border-[1px] border-[#1e293b] rounded-md py-2 px-4 w-full mt-2 focus:outline-none'
                            />
                        </div>
                        {error && 
                            <p className = 'text-red-600 text-sm'> {error} </p>
                        }

                        <button className = {`text-white bg-gradient-to-r from-[#633bc0] to-[#663bca] py-3 px-14 rounded-md flex items-center justify-center hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#209971] transition-colors duration-200 mt-3 ${isLoading ? 'opacity-20 cursor-not-allowed' : ''}`} type = 'submit' disabled = {isLoading} >{isLoading ? 'Creating account...' : 'Agree and Sign up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        </>
    )

}

export default Signup;