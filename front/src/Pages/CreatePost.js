import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const CreatePost = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('myImage', image);

      const response = await axios.post(`http://localhost:8000/api/posts/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        console.log('Post created successfully:', response.data);
        // Clear form inputs after successful submission
        navigate('/');
        setCaption('');
        setImage(null);
      }
    } catch (error) {
      console.log('Error creating post:', error);
      setError(error.response?.data?.message || 'Error creating post. Please try again.');
    }
    setIsLoading(false);

  };


  return (
    <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
      <div className="w-full mt-24 md:w-3/4 lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4">Create Post</h1>
        {error && (
          <p className="w-full border text-white bg-red-400 text-center py-2 mb-4 rounded-md text-lg">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <ReactQuill
              value={caption}
              onChange={setCaption}
              placeholder="Description"
              className="border rounded"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin">
                    <AiOutlineLoading3Quarters className="text-xl" />
                  </div>
                </div>
              ) : (
                "Create post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;