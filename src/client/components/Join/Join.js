import React from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = ({name, room, setName, setRoom, isInvited}) => {
  const disabled = !name || !room;
  return (
      <div className='joinOuterContainer'>
        <div className='joinInnerContainer'>
          <h1 className='heading'>Sign In</h1>
          <div>
            <input placeholder='Name' className='joinInput' type='text' value={name} onChange={(event) => setName(event.target.value)}/>
          </div>
          {
            !isInvited ?
              <div>
                <input placeholder='Room' className='joinInput mt-20' type='text' value={room} onChange={(event) => setRoom(event.target.value)} />
              </div>
                : null
          }
          <Link to={`/chat/${room.toLowerCase()}`} className={`button mt-20${disabled ? ' disabled' : ''}`}>
            Join
          </Link>
        </div>
      </div>
  );
};

export default Join
