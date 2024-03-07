import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from './../api'; // Import your API helper that configures Axios

const ChatPage = () => {
  const { username } = useParams(); // Assuming you're using the username in the URL
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const ws = useRef(null);

//   const wsURL = `${import.meta.env.VITE_SOCKET_URL}/ws/chat/${username}/`;
  const accessToken = localStorage.getItem('access_token');
  const currentUserId = accessToken ? jwtDecode(accessToken).user_id : null;

  const wsURL = `ws://127.0.0.1:8000/ws/chat/${username}/?token=${accessToken}`;



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/direct/messages/?sender=${currentUserId}&receiver=${username}`);
        setMessages(response.data);
        scrollToBottom();
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [username, currentUserId]);


  useEffect(() => {
    ws.current = new WebSocket(wsURL);

    ws.current.onopen = () => {
        console.log("ws opened", ws.current.readyState);
    };
    ws.current.onclose = () => console.log("ws closed");

    // Corrected from ws.onmessage to ws.current.onmessage
    ws.current.onmessage = (e) => {
        console.log("ws message", e.data);
        const receivedMessage = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage.message]);
    };

    return () => {
        ws.current.close();
    };
}, [username]);



  const sendMessage = () => {
    if (newMessage !== "") {
        const messageData = {
            from: currentUserId,
            to: username,
            message: newMessage,
        };

        ws.current.send(JSON.stringify(messageData));
        setNewMessage("");
    }
};


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b-2 border-gray-200 p-2">
        <button onClick={() => navigate(-1)} className="text-blue-500">Back</button>
        <h2 className="text-lg font-semibold">Chat with {username}</h2>
        <div></div>
      </div>
      <ul className="max-h-[37rem] overflow-auto p-2">
        {messages.map((msg, index) => (
          <li key={index} className={`p-2 my-2 rounded-lg ${msg.sender === currentUserId ? "bg-blue-500 text-white float-right" : "bg-gray-300 text-black float-left"} clear-both`}>
            {msg.content}
          </li>
        ))}
      </ul>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-2">
        <input
          type="text"
          className="border p-2 w-full rounded-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </div>
  );

};

export default ChatPage;
