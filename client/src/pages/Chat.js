import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../context/chatContext'
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/userChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/potentialChats';
import Chatbox from '../components/chat/chatBox';
function Chat() {
  const {userChats, updateCurrentChat,currentChat}=useContext(ChatContext)
  const {user} = useContext(AuthContext)
  
  return (
    <Container>
      <PotentialChats/>
      {userChats.length <1 ?null:(
        <Stack direction='horizontal' gap={4} className='align-items-start'>
          <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
          {userChats?.map((chat, index) => {
  return (
    <div key={index} onClick={()=>updateCurrentChat(chat)}>
      <UserChat chat={chat} user={user} />
    </div>
  );
})}
</Stack>
 <Chatbox/>
</Stack>
      )}
  </Container>
);
}  


export default Chat