import React, { useState } from 'react';
import api from './../api'; // Adjust this path as necessary

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [tags, setTags] = useState('');
  const [mentions, setMentions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    mediaFiles.forEach(file => formData.append('media', file));
    formData.append('tags', tags); // Assuming your API expects a comma-separated list of tags
    formData.append('mentions', mentions); // Assuming your API expects a comma-separated list of usernames for mentions

    try {
      await api.post('/content/posts/', formData);
      // Clear form after submission
      setCaption('');
      setMediaFiles([]);
      setTags('');
      setMentions('');
      // Optionally, add logic to refresh the posts feed or display a success message
    } catch (error) {
      console.error('Error creating post:', error);
      // Optionally, display an error message
    }
  };

  const handleFileChange = (e) => {
    setMediaFiles([...e.target.files]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="3"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <input
          type="text"
          placeholder="Mentions (comma-separated usernames)"
          value={mentions}
          onChange={(e) => setMentions(e.target.value)}
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
