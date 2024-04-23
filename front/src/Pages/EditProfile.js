import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { useAuthContext } from '../hooks/useAuthContext';
import useEditProfile from '../hooks/useEditProfile';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useChangeAvatar from '../hooks/useChangeAvatar';
import NoAvatar from '../assets/no-profile-picture-15257.png'

const EditProfile = () => {
    const { user } = useAuthContext();
    const { error, editprofile, isLoading } = useEditProfile();
    const [fullName, setFullName] = useState(user.fullName);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [avatar, setAvatar] = useState(logo);
    const { changeAvatar, isLoadingpp } = useChangeAvatar();

    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleAvatarChange = async (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleAvatarUpload = async (e) => {
        e.preventDefault();
        await changeAvatar(avatar);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editprofile(fullName, username, bio);
    };

    return (
        <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
            <div className="flex justify-center items-center mt-4">
                <form onSubmit={handleAvatarUpload} encType="multipart/form-data">
                    <div className="mb-4">
                        <div className='mb-4 flex justify-center items-center'>
                            <img src={user.avatar ? `http://localhost:8000/uploads/${user.avatar}` : NoAvatar} alt="Post Thumbnail" className="rounded-full border border-white w-24 h-24" />
                        </div>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="border rounded w-40 py-1 px-2 text-sm"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {isLoadingpp ? (
                                "Uploading"
                            ) : (
                                "Upload Avatar"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {error && (
                <div className="border mt-16 w-1/4 border-red-600 text-sm text-red-600 py-2 text-center rounded-lg mb-4">
                    {error}
                </div>
            )}
            <form className={error ? `flex mt-2 flex-col items-center` : `flex mt-24 flex-col items-center`} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={fullName}
                    onChange={handleNameChange}
                    placeholder="Name"
                    className="border bg-black border-gray-300 w-96 rounded py-2 px-4 mb-4"
                />
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    className="border bg-black border-gray-300 w-96 rounded py-2 px-4 mb-4"
                />
                <textarea
                    value={bio}
                    onChange={handleBioChange}
                    placeholder="Bio"
                    className="border bg-black border-gray-300 w-96 rounded py-2 px-4 mb-4 resize-none"
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 w-96 mt-8 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin">
                                <AiOutlineLoading3Quarters className="text-xl" />
                            </div>
                        </div>
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;