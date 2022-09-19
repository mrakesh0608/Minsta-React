import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useSocketContext } from 'hooks/context/useSocketContext';
import { useAuthContext } from 'hooks/context/useAuthContext';
import useFetch from 'hooks/useFetch';

import { shareIcon } from 'helpers/importIcons';
import { isEmptyObj } from 'helpers/function';
import { todayDate } from 'helpers/time';

import ChatContent from 'components/common/ChatContent';
import Back from 'components/common/Back';
import More from 'components/common/More';
import 'css/chat.css';

const Chat = () => {

    const { id } = useParams();
    const { user: I } = useAuthContext();
    const { socket } = useSocketContext();
    const { fetchData, data, isError, isPending } = useFetch();

    const [chats, setChats] = useState({});
    const [newMsg, setNewMsg] = useState('');
    const [online, setOnline] = useState('');
    const [once, setOnce] = useState(true);
    const ref = useRef();

    useEffect(() => {
        socket.on("onlineUsers", () => socket.emit('isOnline', ({ UserName: id })));
        socket.on('setOnline', (status) => setOnline(status))
        socket.on('newMsg', ({ chatId }) => initialize())
        initialize();
    }, [])
    const initialize = () => {
        fetchData({
            path: `/chat?UserName1=${I.Username}&UserName2=${id}`,
            method: 'GET'
        }).then(res => {
            if (res && res.chats) {
                setChats(res.chats);
            }
        });
    }
    useEffect(() => {
        ref.current?.scrollIntoView();
        if (once && data && data._id) {
            socket.emit('joinChat', { chatId: data._id });
            setOnce(false);
        }
    }, [chats]);

    const handleMsgSend = (e) => {
        e.preventDefault();
        if (newMsg) {
            if (!chats[todayDate()]) chats[todayDate()] = [];
            chats[todayDate()].push({ timer: true, UserName: I.Username, msg: newMsg, time: new Date() });
            setChats({ ...chats });
            if (data) {
                fetchData({
                    path: `/chat?id=${data._id}&UserName=${I.Username}&msg=${newMsg}`,
                    method: 'POST'
                }).then(res => {
                    socket.emit('newMsgSend', { chatId: data._id });
                    if (res.chats) setChats(res.chats);
                });
            }
            setNewMsg('');
        }
    }
    return (
        <div className='chat'>
            <div className='chat-head'>
                <Back />
                <div>
                    <Link to={`/user/${id}`}>{id}</Link>
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
                            <ChatContent chats={chats} myUserName={I.Username} />
                            <div ref={ref} />
                        </div >
                    }
                    <form onSubmit={handleMsgSend} id='newMsgForm'>
                        <div className='newMsgSend'>
                            <textarea id='newMsgIp' value={newMsg}
                                onChange={(e) => setNewMsg(e.target.value)}
                                placeholder='New Message' autoComplete='off' autoFocus
                            />
                            <button className='msg-send nav-icons'
                                onFocus={() => document.getElementById('newMsgIp').focus()}
                            ><img src={shareIcon} alt="" /></button>
                        </div>
                    </form>
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