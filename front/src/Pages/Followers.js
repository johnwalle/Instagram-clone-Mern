import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NoAvatar from '../assets/no-profile-picture-15257.png'
import Loader from '../components/Loader'

const FollowersPage = () => {
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);
  const { userID } = useParams();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchFollowers = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userID}/followers`);

        if (response.status === 200) {
          setFollowers(response.data.followers);
        }
      } catch (error) {
        console.log('Error fetching followers:', error);
        setError(error.response.data.message || 'Error fetching followers. Please try again.');
      }
      setIsLoading(false)

    };

    fetchFollowers();
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
      <h1 className="text-3xl mt-4 font-bold mb-4">Followers</h1>

      {error && <p className="text-red-500">{error}</p>}

      {followers.length === 0 ? (
        <p>No followers yet.</p>
      ) : (
        <div className="flex mt-12 flex-col">
          {followers.map((follower) => (
            <div key={follower._id} className="flex items-center mb-4">
              <Link to={`/user/${follower._id}/posts`} className="flex-shrink-0">
                <img src={`http://localhost:8000/uploads/${follower.avatar}` || NoAvatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
              </Link>
              <div className="flex mr-16 flex-col flex-grow">
                <Link to={`/user/${follower._id}/posts`}>
                  <p className="font-bold">{follower.username}</p>
                </Link>
                <p className="text-gray-500">{follower.fullName}</p>
              </div>
              {/* <button className="ml-auto bg-blue-500 text-white rounded flex-shrink-0 px-4 py-2">Follow</button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersPage;