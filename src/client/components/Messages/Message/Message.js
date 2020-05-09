import React from 'react'
import ServiceMessage from "./ServiceMessage/ServiceMessage";
import UserMessage from "./UserMessage/UserMessage";

const Message = ({message: {user, date, text, isService}, name}) => (
    isService ?
        <ServiceMessage text={text}/>
        :
        <UserMessage user={user} date={date} text={text} isSentByMe={user === name.trim().toLowerCase()}/>
);

export default Message