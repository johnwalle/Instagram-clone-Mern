import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { useAuthContext } from './hooks/useAuthContext';
import NotFoundPage from './Pages/NotFound';
import Navbar from './components/Navbar';
import UserProfile from './Pages/UserProfile';
import EditProfile from './Pages/EditProfile';
import CreatePost from './Pages/CreatePost';
import SearchPosts from './Pages/SearchPosts';
import CommentSection from './components/CommentSection';
import MyPosts from './Pages/MyPosts'
import FollowersPage from './Pages/Followers'
import FollowingsPage from './Pages/Followings'
import AuthorPosts from './Pages/AuthorPosts'


function App() {

  const { user } = useAuthContext()

  return (
    <Router>
      {user && <Navbar />
      }
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/login' element={!user ? <Login /> : <Home />} />
        <Route path='/signup' element={!user ? <Signup /> : <Home />} />
        <Route path='/profile' element={!user ? <Login /> : <UserProfile />} />
        <Route path='/edit-profile' element={!user ? <Login /> : <EditProfile />} />
        <Route path='/createpost' element={!user ? <Login /> : <CreatePost />} />
        <Route path='/search-posts' element={!user ? <Login /> : <SearchPosts />} />
        <Route path='/:postID/comments' element={!user ? <Login /> : <CommentSection />} />
        <Route path='/:id/posts' element={!user ? <Login /> : <MyPosts />} />
        <Route path='/:userID/followers' element={!user ? <Login /> : <FollowersPage />} />
        <Route path='/:userID/followings' element={!user ? <Login /> : <FollowingsPage />} />
        <Route path='/user/:creator/posts' element={!user ? <Login /> : <AuthorPosts />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;