import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useAuthContext } from 'hooks/useAuthContext'
const ENDPOINT = 'http://localhost:8000';
let socket;
const Messenger = () => {
    const { user } = useAuthContext();
    const [name, setName] = useState(user.Username);
    const [room, setRoom] = useState('2345');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket = io(ENDPOINT);

        setRoom(room);
        setName(name)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', message => {
            console.log(message);
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            console.log(users);
            setUsers(users);
        });
    }, []);

    // const sendMessage = (event) => {
    //     event.preventDefault();

    //     if (message) {
    //         socket.emit('sendMessage', message, () => setMessage(''));
    //     }
    // }
    return (
        <div id="Messenger">
            <div id="Messenger-content">
                <div id="soon" className="loading">
                    <h1>Messenger</h1><br />
                    <p>This feature is currently under development...</p>
                </div>
            </div>
        </div>
    );
}
export default Messenger;