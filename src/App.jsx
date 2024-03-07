import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UserProfileList from './components/UserProfileList';
import UserProfileDetail from './components/UserProfileDetail';
import CreatePost from './components/CreatePost';
import PostsFeed from './components/PostsFeed';
import PrivateRoute from './components/PrivateRoute';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<div>Home Page</div>} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profiles" element={<UserProfileList />} />
          <Route path="/profiles/:username" element={<UserProfileDetail />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/feed" element={<PostsFeed />} />
          <Route path="/chat/:username" element={<ChatPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
