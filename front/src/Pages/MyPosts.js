import PostAuthor from '../components/PostAuthor';
import Posts from '../components/Posts';

const MyPosts = () => {
    return (
        <div className="border ml-24 bg-black text-white border-gray-300 h-screen flex flex-col items-center">
            <div className="flex border w-1/2 h-screen border-gray-600 p-4 overflow-x-auto">
                <Posts />
            </div>

        </div>
    );
};

export default MyPosts;