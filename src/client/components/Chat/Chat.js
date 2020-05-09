import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {Redirect, useParams} from 'react-router-dom'

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ name, room, setRoom, setIsInvited}) => {

  if (!room) {
    setRoom(useParams().room.toLowerCase());
    setIsInvited(true);
    return <Redirect to='/'/>
  }

  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    socket = io();

    socket.emit('join', { name, room }, (error, messages) => {
      if(error) {
        alert(error);
        setIsError(true);
      } else {
        console.log(messages);
        setMessages(messages)
      }
    });
  }, []);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  if (isError){
    return <Redirect to='/'/>
  }

  return (
      <div className='outerContainer'>
        <div className='container'>
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users}/>
      </div>
  );
};

export default Chat;
