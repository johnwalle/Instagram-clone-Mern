import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdRemoveRedEye } from 'react-icons/md';
import { IoEyeOffSharp } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useSignup from '../hooks/useSignup';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef();

    const [showPassword, setShowPassword] = useState(false);
    const { register, error, isLoading } = useSignup();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(email, setEmail, username, setUsername, fullName, setFullName, password, setPassword)
    };
    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div className="flex flex-col mt-6 items-center justify-center h-screen">
            <div className="bg-white px-6 py-8 shadow-md rounded-md w-80">
                <h2 className="instagarm-heading text-center text-4xl font-bold mb-6">Instagarm</h2>
                <h1 className="font-thin text-center pb-6">Sign up to see photos and videos from your friends.</h1>
                <hr className="pb-6" />
                {error &&
                    <div className="border border-red-600 text-sm text-red-600 py-2 text-center rounded-lg mb-4">{error}</div>
                }
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        required
                        ref={inputRef}
                        placeholder="Email or Phone Number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-smaller"
                        style={{ fontSize: '14px' }}
                    />
                    <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        style={{ fontSize: '14px' }}
                    />
                    <input
                        type="text"
                        required
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        style={{ fontSize: '14px' }}
                    />
                    <div className="relative">
                        <div className="flex">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                style={{ fontSize: '14px' }}
                            />
                            <button
                                type="button"
                                className="flex items-center px-3 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <MdRemoveRedEye /> : <IoEyeOffSharp />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-center w-full hover:bg-blue-600 text-white font-semibold py-2 rounded mt-4 relative"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin">
                                    <AiOutlineLoading3Quarters className="text-xl" />
                                </div>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex items-center justify-center border border-gray-500 px-4 mt-2 py-6 shadow-md rounded-md w-80">
                    <p className="text-sm pr-2">Have an account?</p>
                    <Link className="text-md text-blue-500 hover:text-blue-700 hover:underline" to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;