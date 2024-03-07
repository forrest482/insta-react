import React, { useState } from 'react';
import api from './../api'; // Adjust this path as necessary

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/activities/comments/${postId}/`, { content });
      setContent('');
      // Optionally refresh comments or show success message
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Optionally display error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="form-textarea p-2 border rounded-md"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
