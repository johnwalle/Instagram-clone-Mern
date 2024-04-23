import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NoAvatar from '../assets/no-profile-picture-15257.png';
import Loader from '../components/Loader';

const FollowingsPage = () => {
  const [followings, setFollowings] = useState([]);
  const [error, setError] = useState(null);
  const { userID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  // const [isFollowed, setIsFollowed] = useState(true);

  // const toggleHandler = async (followerID) => {
  //   // setIsFollowed(!isFollowed);
  //   console.log("following id", followerID)
  // };

  useEffect(() => {
    const fetchFollowings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userID}/followings`);

        if (response.status === 200) {
          setFollowings(response.data.followings);
        }
      } catch (error) {
        console.log('Error fetching followings:', error);
        setError(error.response.data.message || 'Error fetching followings. Please try again.');
      }
      setIsLoading(false);
    };

    fetchFollowings();
  }, [userID]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
      <h1 className="text-3xl mt-4 font-bold mb-4">Followings</h1>

      {error && <p className="text-red-500">{error}</p>}

      {followings.length === 0 ? (
        <p>No followings yet.</p>
      ) : (
        <div className="flex mt-12 flex-col">
          {followings.map((following) => (
            <div key={following._id} className="flex items-center mb-4">
              <Link to={`/user/${following._id}/posts`} className="flex-shrink-0">
                <img src={`http://localhost:8000/uploads/${following.avatar}` || NoAvatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
              </Link>
              <div className="flex mr-16 flex-col flex-grow">
                <Link to={`/user/${following._id}/posts`}>
                  <p className="font-bold">{following.username}</p>
                </Link>
                <p className="text-gray-500">{following.fullName}</p>
              </div>
              {/* <button onClick={() => toggleHandler(following._id)} className={`ml-auto text-white rounded flex-shrink-0 px-4 py-2 ${!isFollowed ? 'bg-gray-700' : 'bg-blue-600'}`}>
                {isFollowed ? 'Follow' : 'Following'}
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowingsPage;