import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPosts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/search/users`, {
                    params: {
                        search: searchTerm,
                    },
                });

                if (response.status === 200) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.log('Error fetching posts:', error);
                setError('Error fetching posts. Please try again.');
            }
        };

        fetchUsers();
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Search Posts</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border bg-black border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                >
                    Clear
                </button>
            </div>

            {/* {error && <p className="text-red-500">{error}</p>} */}

            <div className="flex flex-col">
                {users.map((user) => (
                    <div key={user._id} className="flex items-center mb-4">
                        <Link to={`/user/${user._id}/posts`} className="flex-shrink-0">
                            <img src={`http://localhost:8000/uploads/${user.avatar}`} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                        </Link>
                        <div className="flex mr-16 flex-col flex-grow">
                            <Link to={`/user/${user._id}/posts`}>
                                <p className="font-bold">{user.username}</p>
                            </Link>
                            <p className="text-gray-500">{user.fullName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPosts;