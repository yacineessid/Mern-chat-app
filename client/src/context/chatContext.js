// chatContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/Service";

export const ChatContext = createContext();

export function ChatContextProvider({ children, user }) {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatLoading, setUserChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const  [potentialsChats,setPotensialChats]=useState([])
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageLoading, setMessagesLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const getUsers = async () => {
    const response = await getRequest(`/user`);
    
    if (response.error) {
      console.log('error fetching data', response);
    }
    
    const potChats = response.filter((u) => {
      let isChatCreated = false;
      if (user?._id === u._id) return false;
      
      if (userChats) {
        isChatCreated = userChats.some((c) => {
          return c.members[0]._id === u._id || c.members[1]._id === u._id;
        });
      }
      
      return !isChatCreated;
    });
    
    setPotensialChats(potChats);
  }
  

  const getUsersChat = async () => {
    if (user?._id) {
      setUserChatLoading(true);
      setChatError(null);

      try {
        const response = await getRequest(`/chat/${user?._id}`);
        setUserChatLoading(false);

        if (response.error) {
          setChatError(response.message);
        } else {
          setUserChats(response);
        }
      } catch (error) {
        setChatError("An error occurred while fetching user chats.");
      }
    }
  }

  //update current chat
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
  


//get messages function 
const getMessages = async () => {
  setMessagesLoading(true);
  setMessageError(null);
  try {
    const response = await getRequest(`/message/${currentChat?._id}`);
    setMessagesLoading(false);

    if (response.error) {
      setMessageError(response);
      console.log('there is an error.');
    } else {
      setMessages(response);
    }
  } catch (error) {
    setMessagesLoading(false);
    setMessageError("An error occurred while fetching messages.");
    console.error(error);
  }
};


//create chat function
const createChat = useCallback(async (firstId, secondId) => {
  try {
    const response = await postRequest(`${baseUrl}/chat`, { firstId, secondId });
    if (response.error) {
      console.log('Error creating chat:', response.error);
      return;
    }

    // Update userChats and potentialsChats
    setUserChats((prev) => [...prev, response]);
    setPotensialChats((prev) => prev.filter((u) => u._id !== secondId));
  } catch (error) {
    console.error('An error occurred while creating a chat:', error);
  }
}, [setUserChats, setPotensialChats]);



  useEffect(() => {
    getUsers()
    getUsersChat();
    getMessages()
  }, []);

  return (
    <ChatContext.Provider value={{ userChats, isUserChatLoading, chatError
    ,potentialsChats,createChat,updateCurrentChat,messageLoading,messages,messageError }}>
      {children}
    </ChatContext.Provider>
  );
}
