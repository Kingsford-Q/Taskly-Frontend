import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/image.svg';


function Login() {

    const [formData, setFormData] = useState({
            email: '', 
            password: '',
        });

    const emailRef = useRef(null);
    
        useEffect(() => {
        emailRef.current?.focus();
        setFormData({ email: '', password: '' });
        }, []);

    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isLogInSuccessfull, setIsLogInSuccessful] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, 
            [name]: value 
        }));
    };
    

    const handleLogInSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        setError('');
    
        try {
            const response = await fetch('https://taskly-backend-rt4v.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setIsLogInSuccessful(true);
                setFormData({ email: '', password: ''});
                setTimeout(() => {
                    setIsLogInSuccessful(false);
                }, 1000);
    
                localStorage.setItem("token", data.token);
    
            } else {
                setError(data?.message || 'Login failed');
            }
        } catch (error) {
            console.error(error.message);
            setError('Something went wrong, try again.');
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <>

        <div className = 'flex justify-center items-center h-screen flex-col'>  
        
            <div className = 'mt-0'>
                <div className = 'flex justify-center items-center'>
                    <div className = 'w-[70%]'>
                        <img src = {logo} className = 'object-cover w-full'/>
                    </div>
                </div>


                <div className = 'flex flex-col justify-center items-center'>

                    <form className = 'w-full flex flex-col gap-4' onSubmit={handleLogInSubmit}>

                        {isLogInSuccessfull && (
                            <p className='bg-green-400 text-white p-2 text-center rounded-md'>
                                Login Successful!
                            </p>
                        )}

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

                        <button className = {`text-white bg-gradient-to-r from-[#633bc0] to-[#663bca] py-3 px-14 rounded-md flex items-center justify-center hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#209971] transition-colors duration-200 mt-3 ${isLoading ? 'opacity-20 cursor-not-allowed' : ''}`} type = 'submit' disabled = {isLoading} >{isLoading ? 'Logging in...' : 'Log in'}
                        </button>

                    </form>
                </div>
            </div>
        </div>

        </>
    )

}

export default Login;