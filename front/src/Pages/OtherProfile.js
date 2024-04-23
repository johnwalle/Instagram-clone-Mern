import { Link } from 'react-router-dom';
import NoAvatar from '../assets/no-profile-picture-15257.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const UserProfile = ({ creator }) => {
    const [posts, setPosts] = useState("");
    const [followedBy, setFollowedBy] = useState([])
    const [countFollowers, setCountFollowers] = useState(0)
    const [countFollowings, setCountFollowings] = useState(0)
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isFollowed, setIsFollowed] = useState(false);
    const { user } = useAuthContext();

    console.log("followedBy", followedBy)
    console.log("number of followers", countFollowers)


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${creator}`);
                const userData = response.data;
                if (response.status === 200) {


                    setPosts(userData.posts);
                    setFollowedBy(userData.follower);
                    setCountFollowers(userData.followersCount);
                    setCountFollowings(userData.followingsCount);
                    setUserName(userData.username);
                    setBio(userData.bio)
                    setAvatar(userData.avatar)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [creator]);

    const handleToggleFollow = async (e) => {
        e.preventDefault();
        setIsFollowed(!isFollowed);
        setCountFollowers(isFollowed ? countFollowers - 1 : countFollowers + 1)
        try {
            await axios.put(
                `http://localhost:8000/api/users/follow/${creator}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        const followed = followedBy.includes(user.id);

        if (followed) {
            setIsFollowed(true);
        }
    }, [followedBy, user.id]);


    const isCurrentUserPost = user && user.id === creator;


    return (
        <div className="flex mt-2 w-1/2 items-center justify-between border border-gray-600 mb-2 p-4">
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <img src={avatar ? `http://localhost:8000/uploads/${avatar}` : NoAvatar} alt="Post Thumbnail" className="rounded-full border border-white w-14 h-14" />
                    <div className="text-xl font-bold">@{userName}</div>
                    <div className="text-sm pt-3 max-w-36 text-center">{bio}</div>
                </div>
                <div className="ml-12 -mt-8 flex">
                    <div className="flex flex-col pr-6 mt-8">
                        <Link to={`/user/${creator}/posts`}>
                            <p className="text-sm">Posts</p>
                            <p className="text-lg font-bold">{posts}</p>
                        </Link>
                    </div>
                    <div className="flex flex-col pr-6 mt-8">
                        <Link to={`/${creator}/followers`}>
                            <p className="text-sm">Followers</p>
                            <p className="text-lg font-bold">{countFollowers}</p>
                        </Link>
                    </div>
                    <div className="flex flex-col mt-8">
                        <Link to={`/${creator}/followings`}>
                            <p className="text-sm">Followings</p>
                            <p className="text-lg font-bold">{countFollowings}</p>
                        </Link>
                    </div>
                    {!isCurrentUserPost && (
                        <button
                            onClick={handleToggleFollow}
                            className={`ml-36 mt-6 w-9 h-9 rounded ${isFollowed ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'
                                } hover:bg-opacity-80 transition-colors duration-300`}
                            style={{ minWidth: '8rem' }}
                        >
                            {isFollowed ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;