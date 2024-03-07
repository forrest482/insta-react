import React, { useEffect, useState } from 'react';
import api from './../api';
import Slider from 'react-slick';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setCurrentUserId(decodedToken.user_id);
    }

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/content/posts/following/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await api.delete(`/activities/comments/${commentId}/`);
      fetchPosts(); // Re-fetch posts to update the comments
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };


  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {posts.map(post => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center mb-4">
            <img src={post.user.profile_picture || 'default-profile-pic.jpg'} alt="Profile" className="h-10 w-10 rounded-full mr-2" />
            <Link to={`/profiles/${post.user.username}`} className="font-bold">{post.user.username}</Link>
          </div>
          {post.media.length > 0 && (
            <Slider {...sliderSettings}>
              {post.media.map((mediaItem, index) => (
                <div key={index}>
                  <img src={mediaItem.media} alt={`Post media ${index}`} className="mt-2 rounded" />
                </div>
              ))}
            </Slider>
          )}
          <p className="text-gray-700 mt-1">{post.caption}</p>
          <div className="text-sm text-gray-500 mt-2">Tags: {post.tags.map(tag => `#${tag.name}`).join(', ')}</div>
          <div className="text-sm text-gray-500">Mentions: {post.mentions.map(mention => `@${mention.user.username}`).join(', ')}</div>
          <div className="mt-2">
            <LikeButton postId={post.id} isLiked={post.is_liked} />
            <span>{post.likes.length} likes</span>
          </div>
          <div className="mt-2">
            <CommentForm postId={post.id} />
            <span>{post.comments.length} comments</span>
          </div>
          {/* Comments section */}
          <div className="mt-2">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-2">
                <img src={comment.user.profile_picture || 'default-profile-pic.jpg'} alt="Profile" className="h-6 w-6 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm"><strong>{comment.user.username}</strong>: {comment.content}</p>
                  {comment.user.id === currentUserId  && (
                    <button onClick={() => handleDeleteComment(post.id, comment.id)} className="text-xs text-red-500">Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;
