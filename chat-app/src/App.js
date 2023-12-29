import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const RoomEntry = ({ setRoomName }) => {
  const [roomNameInput, setRoomNameInput] = useState('');

  const handleJoinRoom = () => {
    if (roomNameInput.trim() !== '') {
      setRoomName(roomNameInput);
    }
  };

  return (
    <div>
      <h2>Enter Room Name</h2>
      <input
        type="text"
        value={roomNameInput}
        onChange={(e) => setRoomNameInput(e.target.value)}
        placeholder="Enter Room Name"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

const ChatRoom = ({ roomName }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const socketUrl = `ws://localhost:8000/ws/chat/${roomName}/`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    }
  }, [lastMessage]);

  const handleSendMessage = () => {
    console.log(messageInput)
    console.log(sendMessage)
    console.log(socketUrl)
    console.log(readyState)
    if (messageInput.trim() !== '') {
      sendMessage(JSON.stringify({ message: messageInput }));
      setMessageInput('');
    }
  };

  return (
    <div>
      <h2>Chat Room: {roomName}</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

const App = () => {
  const [roomName, setRoomName] = useState(null);

  return (
    <div>
      {!roomName ? (
        <RoomEntry setRoomName={setRoomName} />
      ) : (
        <ChatRoom roomName={roomName} />
      )}
    </div>
  );
};

export default App;
