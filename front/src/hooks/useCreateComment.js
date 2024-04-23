import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useParams } from "react-router-dom";

const useCreateComment = () => {
    // const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();
    const { postID } = useParams();

    const createComment = async (newComment, setNewComment) => {
        // setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:8000/api/${postID}/create-comments`,
                { comment: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (response.status === 200) {
                setNewComment("");
                console.log("Comment created successfully!");
            }
        } catch (error) {
            console.error("Error while creating comment:", error);
        }
        // setLoading(false);
    };

    return {
        createComment,
    };
};

export default useCreateComment;