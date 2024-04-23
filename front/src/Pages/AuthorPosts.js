import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostItems from '../components/PostItems';
import axios from 'axios';
import Loader from '../components/Loader';
import OtherProfile from './OtherProfile';

const Posts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [authorPost, setAuthorPost] = useState([]);
    const { creator } = useParams();


    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8000/api/users/${creator}`);
    //             const userData = response.data;
    //             if (response.status === 200) {
    //                 setCountFollower(userData.followersCount);
    //                 setFollowers(userData.follower);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     getUser();
    // }, [creator]);





    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/posts/user/${creator}`);
                const postData = response.data;

                if (response.status === 200) {
                    setAuthorPost(postData);
                }

            } catch (error) {
                console.log(error.response.data.message);
            }
            setIsLoading(false);
        };

        fetchPosts();
    }, [creator]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
            <OtherProfile creator={creator} />
            <div className="flex border w-1/2 h-screen border-gray-600 p-4 overflow-x-auto">
                <section className="flex flex-col items-stretch h-full w-full">
                    {authorPost.length > 0 ? (
                        authorPost.map(({ _id, image, caption, creator, comments, likesCount, like, createdAt }) => (
                            <PostItems
                                key={_id}
                                postID={_id}
                                image={image}
                                caption={caption}
                                creator={creator}
                                likesCount={likesCount}
                                likedBy={like}
                                comments={comments}
                                createdAt={createdAt}

                            />
                        ))
                    ) : (
                        <h1 className="flex items-center justify-center text-3xl font-bold">
                            No posts found.
                        </h1>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Posts;