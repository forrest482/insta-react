import React, { useState } from 'react';
import api from './../api'; // Adjust this path as necessary

const LikeButton = ({ postId, isLikedInitially = false }) => {
  const [isLiked, setIsLiked] = useState(isLikedInitially);

  const toggleLike = async () => {
    try {
      const response = await api.post(`/activities/likes/${postId}/`);
      setIsLiked(response.data.status === 'liked');
    } catch (error) {
      console.error('Error toggling like:', error);
      // Optionally display error message
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`py-2 px-4 rounded ${isLiked ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-700'} text-white font-bold`}
    >
      {isLiked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;
