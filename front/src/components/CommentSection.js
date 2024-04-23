import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useCreateComment from '../hooks/useCreateComment';
import NoAvatar from '../assets/no-profile-picture-15257.png'

const CommentSection = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { postID } = useParams();
    const { createComment } = useCreateComment();

    const getComments = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/${postID}/comments`);
            if (response.status === 200) {
                setComments(response.data); // Assuming comments are in the response data
            }
        } catch (error) {
            console.error(error);
            // You can display an error message to the user here
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getComments();
    }, [postID]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createComment(newComment, setNewComment);
            await getComments(); // Fetch comments for the newly created post
        } catch (error) {
            console.error(error);
            // You can display an error message to the user here
        } finally {
            setIsLoading(false);
            setNewComment(''); // Clear new comment input after successful creation
        }
    };


    return (
        <div className="border ml-24 bg-black  text-white border-gray-300 h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Comment Section</h1>
            <div className="my-12 border w-1/2 h-screen border-gray-300">
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map((comment, index) => (
                        <div key={index} className="flex items-center  rounded pl-4  pt-3 ">
                            <div className="w-10 h-10 rounded-full mr-4">
                                {/* Assuming comment.author.profilePicture is a URL */}
                                <Link to={`/user/${comment.authorID}/posts`}>
                                    <img
                                        src={
                                            comment.authorAvatar
                                                ? `http://localhost:8000/uploads/${comment.authorAvatar}`
                                                : NoAvatar}
                                        alt={comment.author}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div className="flex flex-col">
                                <Link to={`/user/${comment.authorID}/posts`}>
                                    <p className="text-sm  font-semibold mb-1">@{comment.author}</p>
                                </Link>
                                <p className="text-gray-600">{comment.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className="border bg-black border-gray-300 rounded px-4 py-2 mb-2 w-full"
                    placeholder="Add your comment..."
                ></textarea>
                <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={isLoading} // Disable the button while creating a comment
                >
                    {isLoading ? 'Creating...' : 'Add Comment'}
                </button>
            </div>
        </div>
    );
};

export default CommentSection;