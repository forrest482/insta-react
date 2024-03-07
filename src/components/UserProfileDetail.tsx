import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // To access URL params
import api from "./../api";

const UserProfileDetail = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // State to manage follow status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/profiles/${username}/`);
        setProfile(response.data);
        // Optionally, check if the current user is following this profile and set isFollowing
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    const checkFollowStatus = async () => {
      try {
        const followResponse = await api.get(
          `/users/follow-status/${username}/`
        );
        setIsFollowing(followResponse.data.is_following);
      } catch (error) {
        console.error("Failed to check follow status:", error);
      }
    };

    fetchProfile();
    checkFollowStatus();
  }, [username]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/users/follow/${username}/`);
      } else {
        await api.post(`/users/follow/${username}/`);
      }
      setIsFollowing(!isFollowing); // Toggle follow state
    } catch (error) {
      console.error("Failed to update follow status:", error);
    }
  };

  if (!profile) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <div className="text-center">
        <img
          src={profile.profile_picture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="inline-block h-32 w-32 rounded-full"
        />
        <h1 className="mt-4 text-2xl font-semibold">{profile.username}</h1>
        <p className="text-gray-600">
          {profile.first_name} {profile.last_name}
        </p>
        <p className="mt-2">{profile.bio}</p>

        <button
          onClick={handleFollow}
          className={`mt-4 px-4 py-2 font-semibold rounded-full ${
            isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>

        <button
          onClick={() => navigate(`/chat/${profile.username}`)} // Assuming you'll use the username in the URL for the chat page
          className="mt-2 px-4 py-2 font-semibold rounded-full bg-green-500 text-white"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default UserProfileDetail;
