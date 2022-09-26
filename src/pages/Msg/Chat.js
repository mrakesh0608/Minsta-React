import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useSocketContext } from 'hooks/context/useSocketContext';
import { useAuthContext } from 'hooks/context/useAuthContext';
import useFetch from 'hooks/useFetch';

import { isEmptyObj } from 'helpers/function';
import { todayDate } from 'helpers/time';

import ChatCard from 'components/Chat/ChatCard';
import Back from 'components/common/Back';
import More from 'components/common/More';
import UserLink from 'components/User/UserLink';
import NewMsgForm from 'components/common/NewMsgForm';
import 'css/chat.css';

const Chat = () => {

    const { id } = useParams();
    const { user: I } = useAuthContext();
    const { socket } = useSocketContext();
    const { fetchData, data, isError, isPending } = useFetch();

    const [chats, setChats] = useState({});
    const [online, setOnline] = useState('');
    const [once, setOnce] = useState(true);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView();
        if (once && data && data._id) {
            socket.emit('joinChat', { chatId: data._id });
            setOnce(false);
            socket.on(`newMsg-${data._id}`, ({ chatId }) => initialize())
        }
    }, [chats]);

    useEffect(() => {
        socket.on("onlineUsers", () => socket.emit('isOnline', ({ Username: id })));
        socket.on('setOnline', (status) => setOnline(status))
        initialize();
        socket.emit('isOnline', ({ Username: id }));
    }, [])
    const initialize = () => {
        fetchData({
            path: `/chat?Username1=${I.Username}&Username2=${id}`,
            method: 'GET'
        }).then(res => {
            if (res && res.chats) {
                setChats(res.chats);
            }
        });
    }

    const handleMsgSend = (e) => {
        e.preventDefault();
        const newMsg = e.target.newMsgIp.value;

        if (newMsg) {
            e.target.newMsgIp.value = '';

            if (!chats[todayDate()]) chats[todayDate()] = [];
            const MsgLoad = { Username: I.Username, msg: newMsg, time: new Date() }
            chats[todayDate()].push({ timer: true, ...MsgLoad });
            setChats({ ...chats });

            if (data) {
                fetchData({
                    path: `/chat?id=${data._id}&Username=${I.Username}&msg=${newMsg}`,
                    method: 'POST'
                }).then(res => {
                    socket.emit('newMsgSend', { chatId: data._id, MsgLoad });
                    if (res.chats) setChats(res.chats);
                });
            }
        }
    }
    return (
        <div className='chat'>
            <div className='chat-head'>
                <Back />
                <div>
                    <UserLink Username={id} />
                    <br />
                    <span>{online}</span>
                </div>
                <More />
            </div>
            {(data || !isEmptyObj(chats)) ?
                <>
                    {isEmptyObj(chats) ?
                        <div className='div-msg'>Send your first Messege to {id}</div> :
                        <div className='chat-content'>
                            {Object.keys(chats).map((day, key) =>
                                <div key={key}>
                                    <div className='chat-day'><span>{day}</span></div>
                                    {chats[day].map((chat, key) =>
                                        <ChatCard key={key} chat={chat} myUsername={I.Username} day={day} />
                                    )}
                                </div>
                            )}
                            <div ref={ref} />
                        </div >
                    }
                    <NewMsgForm handleMsgSend={handleMsgSend} />
                </> :
                (isError ?
                    <div className='err-msg'>{isError}</div> :
                    (isPending && <div className='loading'><p>Loading Messages ...</p></div>)
                )
            }
        </div >
    );
}
export default Chat;