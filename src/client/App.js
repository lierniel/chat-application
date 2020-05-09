import React, {useState} from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [isInvited, setIsInvited] = useState(false);

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Join name={name} room={room} setName={setName} setRoom={setRoom} isInvited={isInvited}/>
                </Route>
                <Route path="/chat/:room">
                    <Chat name={name} room={room} setRoom={setRoom} setName={setName} setIsInvited={setIsInvited}/>
                </Route>
            </Switch>
        </Router>
      );
};

export default App;
