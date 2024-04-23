import React, { useEffect, useState } from "react";
import NoAvatar from '../assets/no-profile-picture-15257.png';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const PostAuthor = ({ creator, follower }) => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  // const [isFollowed, setIsFollowed] = useState([]);
  // const [isFollower, setIsFollower] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${creator}`);
      const userData = response.data;
      if (response.status === 200) {
        setFullName(userData.fullName);
        setAvatar(userData.avatar);
        // setIsFollowed(userData.follower)
        // console.log("followed by", userData.follower)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [creator]);


  // useEffect(() => {
  //   const followed = isFollowed.includes(user.id)
  //   if (followed) {
  //     setIsFollower(true);
  //   }
  // }, [])


  if (isLoading) {
    return <Loader />;
  }
  // const isCurrentUserPost = user && user.id === creator;


  return (
    <div className="flex items-center justify-between border border-gray-600 mb-2 p-4">
      <Link to={`/user/${creator}/posts`}>
        <div className="mr-3 flex items-center">
          <img
            src={avatar ? `http://localhost:8000/uploads/${avatar}` : NoAvatar}
            alt="Post Thumbnail"
            className="rounded-full border border-white w-14 h-14"
          />
          <h1 className="pl-2 text-white">{fullName}</h1>
        </div>
      </Link>
      {/* {!isCurrentUserPost && isFollower && <div>following</div>} */}
    </div >
  );
};

export default PostAuthor;