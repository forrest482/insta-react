import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../api';

const UserProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get('/users/profiles/');
        setProfiles(response.data);
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">User Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out">
            <div className="p-4">
              <img src={profile.profile_picture || 'https://via.placeholder.com/150'} alt={profile.username} className="rounded-full h-24 w-24 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-center mb-2">{profile.username}</h3>
              <p className="text-gray-600 text-sm text-center">{profile.bio}</p>
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-b-lg">
              <Link to={`/profiles/${profile.username}`} className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">View Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileList;
