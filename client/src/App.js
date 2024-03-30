import React, {useEffect, useState} from 'react'
import { socket, URL } from './socket';

export default function App() {
  const [data, setData] = useState('');

// if we want to do something on connect. Without this block of code app will still connect (via socket.js file parameters)
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    return () => {
      socket.off('connect');
    };
  }, []);


// What to do once app gets data emitted by the server with the event's name "fromServer"
  socket.on('fromServer', (data) => {
    console.log(data);
    setData(data);
  });



  return (
    <div>
    <h1>Socket.io one-to-all</h1>
    <p>Server sends data to all the clients.</p> 
    <p>The data is received rendered.</p> 
    <p>No user action is required, client is just recepient of events initiated at the server.</p>
    <p>This is the data received from the server: {data}</p>
    </div>
    )
}