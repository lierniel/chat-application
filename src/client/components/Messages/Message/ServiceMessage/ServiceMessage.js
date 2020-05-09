import React from 'react'

import './ServiceMessage.css'

const ServiceMessage = ({text}) => (
    <div className='serviceMessageContainer'>
        <p className='serviceMessageText'>{text}</p>
    </div>
);

export default ServiceMessage