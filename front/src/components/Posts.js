import { useState, useEffect } from 'react';
import PostItems from './PostItems';
import axios from 'axios';
import Loader from '../components/Loader'

const Posts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/posts`);
                const postData = response.data;

                if (response.status === 200) {
                    setAllPosts(postData);
                    console.log("alll posts", postData);
                }

            } catch (error) {
                console.log(error.response.data.message);
            }
            setIsLoading(false);
        };

        fetchPosts();
    }, []);



    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="flex flex-col items-stretch h-full w-full">
            {allPosts.length > 0 ? (
                allPosts.map(({ _id, image, caption, creator, like, comments, likesCount, createdAt }) => (
                    <PostItems
                        key={_id}
                        postID={_id}
                        image={image}
                        caption={caption}
                        creator={creator}
                        comments={comments}
                        createdAt={createdAt}
                        likesCount={likesCount}
                        likedBy={like}
                     
                    />
                ))
            ) : (
                <h1 className="flex items-center justify-center text-3xl font-bold">
                    No posts found.
                </h1>
            )}
        </section>
    );
};

export default Posts;