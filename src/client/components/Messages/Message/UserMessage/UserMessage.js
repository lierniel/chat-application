import React from 'react';
import {format} from 'date-fns'

import './UserMessage.css';

import ReactEmoji from 'react-emoji';

const UserMessage = ({user, text, date, isSentByMe}) => (
    <div className = {`messageContainer${isSentByMe ? ' sentByMe' : ''} `}>
        {isSentByMe ? <p className="sentText pr-10">me</p> : null}
        <div className='messageBox'>
            <p className="messageText">{ReactEmoji.emojify(text)}</p>
            <p className="messageDate">{formatDate(date)}</p>
        </div>
        {!isSentByMe ? <p className="sentText pl-10">{user}</p> : null}
    </div>
);

const formatDate = (date) => {
    const messageDate = new Date(date);
    const currentDate = new Date();

    if (messageDate.getDay() === currentDate.getDay()) return format(messageDate, 'HH:mm');
    else if (messageDate.getYear() === currentDate.getYear()) return format(messageDate, 'dd.MM HH:mm');
    else return format(messageDate, 'dd.MM.yyy HH:mm');

};

export default UserMessage;