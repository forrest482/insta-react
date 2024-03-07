import React, { useState, useEffect } from 'react';
import api from './../api'; // Adjust the import path as necessary

const Profile = () => {
  const [profile, setProfile] = useState({ user: {} });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({   bio: '',
  first_name: '',
  last_name: '',
  profile_picture: null,
 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile/'); // Ensure the endpoint matches your Django URL
        setProfile(response.data);
        setEditData({
            bio: response.data.bio,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            profile_picture: response.data.profile_picture,
          });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        // Optionally, handle error (e.g., display a message)
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('bio', editData.bio);
      formData.append('first_name', editData.first_name);
      formData.append('last_name', editData.last_name);

      if (editData.profile_picture && editData.profile_picture !== profile.profile_picture) {
        formData.append('profile_picture', editData.profile_picture);
      }

      const response = await api.patch('/users/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile({ ...response.data, user: { ...profile.user, ...response.data.user } });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <div className="text-center">
        <img
          src={profile.profile_picture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="inline-block h-32 w-32 rounded-full"
        />
        <h1 className="mt-4 text-2xl font-semibold">{profile.username}</h1>
        <p>{profile.first_name} {profile.last_name}</p>
        <p>{profile.email}</p>

        {isEditing ? (
            <form onSubmit={handleSaveChanges} className="space-y-4">
                <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={editData.first_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="First Name"
                />
                </div>

                <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={editData.last_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Last Name"
                />
                </div>

                <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    name="bio"
                    id="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Bio"
                ></textarea>
                </div>

                <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                type='submit'
                >
                Save Changes
                </button>
          </form>
        ) : (
          <div>
            <p className="mt-2">{profile.bio}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={handleEditToggle}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
