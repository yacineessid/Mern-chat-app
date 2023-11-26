// Chatbox.js
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chatContext';
import { useFetchRecipientUser } from '../../hooks/userFetchRecipient';
import { Stack } from 'react-bootstrap';
import moment from 'moment';

const Chatbox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, messageLoading } = useContext(ChatContext);
  const {recipientUser } = useFetchRecipientUser(currentChat, user);
// console.log(recipientUser,'recipient');
console.log(recipientUser,'recipientttt' ,messages,'messagesss');

  if (!recipientUser) return <p style={{ textAlign: 'center', width: '100%' }}>No conversation selected yet...</p>;
  if (messageLoading) return <p style={{ textAlign: 'center', width: '100%' }}>Chat is loading...</p>;

  return (
    <Stack gap={4} className="chat-box">
      <p>hellos</p>
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack key={index}>
              <span>{message.text}</span>
              <span>{moment(message.createdAt).calendar()}</span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default Chatbox;
