// useFetchRecipientUser.js
import { useState, useEffect } from 'react';
import { getRequest } from '../utils/Service';

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [recipientError, setError] = useState(null);
  const recipientId = chat?.members.find((id) => id !== user._id);

  const getUser = async () => {
    if (!recipientId) {
      return null;
    }

    try {
      let res = await getRequest(`/user/${recipientId}`);
      console.log(res, 'API response'); // Log the API response
      if (res.error) {
        setError(res.error);
      } else {
        setRecipientUser(res);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  useEffect(() => {
    getUser()
    
  }, [recipientId]);
  }
 
