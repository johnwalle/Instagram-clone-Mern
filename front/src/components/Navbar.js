import React from "react";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdHomeFilled } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { GrProductHunt } from "react-icons/gr";
import "../App.css";

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const location = useLocation();

    const logoutHandler = () => {
        logout();
    };

    return (
        <nav className="bg-gray-900 flex flex-col justify-between h-screen w-1/4 fixed left-0 pl-0">
            <div className="flex ml-0 mt-24 flex-col justify-start items-center">
                <Link to="/" className="instagarm-heading text-white font-bold text-3xl mb-8">
                    Instagram
                </Link>

                {user && (
                    <div className="flex flex-col items-start">
                        <Link
                            to="/"
                            className={`nav-link pb-6 flex items-center ${location.pathname === "/" ? "active" : ""
                                }`}
                        >
                            <MdHomeFilled className="text-gray-200 mr-3 h-6 w-6" />
                            <span className={`${location.pathname === "/" ? "text-white font-bold" : "text-gray-200"}`}>Home</span>
                        </Link>
                        <Link
                            to="/search-posts"
                            className={`nav-link pb-6 flex items-center ${location.pathname === "/search" ? "active" : ""
                                }`}
                        >
                            <FaSearch className="text-gray-200 mr-3 h-6 w-6" />
                            <span className={`${location.pathname === "/search" ? "text-white font-bold" : "text-gray-200"}`}>Search</span>
                        </Link>
                        <Link
                            to="/createpost"
                            className={`nav-link pb-6 flex items-center ${location.pathname === "/createpost" ? "active" : ""
                                }`}
                        >
                            <MdAddAPhoto className="text-gray-200 mr-3 h-6 w-6" />
                            <span className={`${location.pathname === "/createpost" ? "text-white font-bold" : "text-gray-200"}`}>Create Post</span>
                        </Link>
                        <Link
                            to="/profile"
                            className={`nav-link pb-6 flex items-center ${location.pathname === "/profile" ? "active" : ""
                                }`}
                        >
                            <GrProductHunt className="text-gray-200 mr-3 h-6 w-6" />
                            <span className={`${location.pathname === "/profile" ? "text-white font-bold" : "text-gray-200"}`}>Profile</span>
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="logout-button text-gray-100 border-cyan-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md-lg"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;