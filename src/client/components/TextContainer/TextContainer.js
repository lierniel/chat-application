import React, {useRef} from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import './TextContainer.css';
import menuIcon from '../../icons/menuIcon.png'

const TextContainer = ({ users }) => {

  const chatInfoElement = useRef(null);

  return (
      <div className='chatInfo' ref={chatInfoElement} >
          <img src={menuIcon} width='30px' onClick={() => chatInfoElement.current.classList.toggle('active')} className='menuIcon' alt='menuIcon'/>
          <div className='textContainer'>
              <div>
                  <h1>Users in room</h1>
                  <div className='activeContainer'>
                      <h2>
                          {users.map(({name}) => (
                              <div key={name} className='activeItem'>
                                  {name}
                                  <img alt='Online Icon' src={onlineIcon}/>
                              </div>
                          ))}
                      </h2>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default TextContainer;