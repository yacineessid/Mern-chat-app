 import React, { useContext } from 'react';
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/AuthContext';

        export default function PotentialChats() {
            const {potentialsChats,createChat}= useContext(ChatContext)
            const {user}= useContext(AuthContext)
            return (
                <div className='all-users'>
              {potentialsChats &&potentialsChats.map((u,index)=>{
                return(<div className='single-user' key={index} 
                onClick={()=>createChat(user._id,u._id)}
                >{u.name}
                </div>)
              })}
                </div>
                )}