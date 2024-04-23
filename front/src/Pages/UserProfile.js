import { useEffect, useState } from 'react';
import { Link, useAsyncError } from 'react-router-dom';
import NoAvatar from '../assets/no-profile-picture-15257.png';
import { useAuthContext } from '../hooks/useAuthContext';
import { GoPlusCircle } from "react-icons/go";
import axios from 'axios'
import Loader from '../components/Loader';

const UserProfile = () => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const [countFollowers, setCountFollowers] = useState(0)
    const [countFollowings, setCountFollowings] = useState(0)    // const [followers, setFollowers] = useState("");
    // const [followings, setFollowings] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${user.id}`);
                const userData = response.data;
                if (response.status === 200) {


                    setPosts(userData.posts);
                    setCountFollowers(userData.followersCount);
                    setCountFollowings(userData.followingsCount);
                    // setUserName(userData.username);
                    // setBio(userData.bio)
                }
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false)
        };

        fetchUserData();
    }, [user.id]);

    if (isLoading) {
        return <Loader />
    }


    return (
        <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
            <div className="flex  mt-24 justify-center items-center ">
                <div>
                    <img src={user.avatar ? `http://localhost:8000/uploads/${user.avatar}` : NoAvatar} alt="Post Thumbnail" className="rounded-full border border-white w-24 h-24" />

                    <div className='-ml-5'>
                        <div className="text-xl text-center font-bold">@{user.username}</div>
                        <div className="text-sm items-center pt-3 max-w-36 text-center">{user.bio}</div>
                    </div>

                    <div className="mt-8 mb-4">
                        <Link
                            to={`/edit-profile`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    {user && (
                        <div className="flex flex-col justify-center items-center mt-12">
                            <Link to="/createpost">
                                <GoPlusCircle className="text-gray-200 mr-3 h-14 w-14" />
                                <span className="text-center ml-3 text-sm font-bold">New</span>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="ml-12 -mt-56 flex justify-center items-start flex-row">
                    <div className="flex flex-col pr-6 mt-8">
                        <Link to={`/user/${user.id}/posts`}>
                            <p className="text-sm">Posts</p>
                            <p className="text-lg font-bold">{posts}</p>
                        </Link>
                    </div>

                    <div className="flex flex-col pr-6 mt-8">
                        <Link to={`/${user.id}/followers`}>

                            <p className="text-sm">Followers</p>
                            <p className="text-lg font-bold">{countFollowers}</p>
                        </Link>
                    </div>
                    <div className="flex flex-col mt-8">
                        <Link to={`/${user.id}/followings`}>
                            <p className="text-sm">Followings</p>
                            <p className="text-lg font-bold">{countFollowings}</p>
                        </Link>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UserProfile;