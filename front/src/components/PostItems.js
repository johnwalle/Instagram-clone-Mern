import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PostItems = ({ postID, caption, creator, image, likedBy, comments, likesCount, createdAt }) => {
    const [like, setLike] = useState(likesCount);
    const [likeUnlike, setLikeUnlike] = useState(false);
    const [userName, setUserName] = useState("");
    const { user } = useAuthContext();

    const likeHandler = async () => {
        setLikeUnlike(!likeUnlike);
        setLike(likeUnlike ? like - 1 : like + 1);

        try {
            const response = await axios.put(
                `http://localhost:8000/api/posts/like/${postID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            // if (response.status === 200) {
            //     setLikeUnlike(!likeUnlike);
            // }
        } catch (error) {
            console.error(error);
        }
    };





    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${creator}`);
                const userData = response.data;
                if (response.status === 200) {
                    setUserName(userData.username);
                    // setIsFollowed(userData.follower)
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUser();
    }, [creator]);

    const extractTextFromHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || doc.body.innerText || "";
    };

    const extractedCaption = extractTextFromHTML(caption);

    useEffect(() => {
        const likers = likedBy?.includes(user?.id);

        if (likers) {
            setLikeUnlike(true);
            setLike(likesCount);
        }
    }, []);

    return (
        <article className="flex flex-col shadow rounded-lg border-gray-300 mb-5">
            <PostAuthor creator={creator} />
            <div className="flex-grow-0">
                <img src={`http://localhost:8000/uploads/${image}`} alt="Post Thumbnail" className="w-full h-48 md:h-96 object-cover" />
            </div>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-center">
                    {likeUnlike ? (
                        <AiFillHeart onClick={likeHandler} className="mr-4 cursor-pointer text-red-500 text-2xl" />
                    ) : (
                        <AiOutlineHeart onClick={likeHandler} className="cursor-pointer mr-4 text-2xl" />
                    )}
                    <Link to={`/${postID}/comments`}>
                        <FaRegComment className="text-xl" />
                    </Link>
                </div>
            </div>
            <div className="pl-4">
                {like === 0 || like === 1 ? `${like} like` : `${like} likes`}
            </div>
            <div className="flex items-center flex-grow pl-4">
                <span className="font-bold pr-1">@{userName} </span>
                <span>{extractedCaption}</span>
            </div>
            <div className="pt-1">
                <div className="pl-4">
                    <Link className="text-sm" to={`/${postID}/comments`}>
                        {comments && comments !== 0
                            ? comments === 1
                                ? `View 1 comment`
                                : `View all ${comments} comments`
                            : "Add your comment..."}
                    </Link>
                </div>
                <div className="text-sm pl-4">
                    {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </div>
            </div>
        </article>
    );
};

export default PostItems;