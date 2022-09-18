import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import useFetch from 'hooks/useFetch';
import { useSocketContext } from 'hooks/useSocketContext';
import { shareIcon } from 'helpers/importsIcons';
import { todayDate } from 'helpers/time';
import { isEmptyObj } from 'helpers/function';
import 'css/chat.css';
import ChatContent from 'components/common/ChatContent';
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
        initialize();
        socket.on('message', message => {
            console.log(message);
        });
        socket.on("onlineUsers", ({ users }) => {
            console.log(users)
            setOnline('offline');
            users.forEach(user => {
                if (user.UserName === id) {
                    setOnline('online');
                }
            })
        });
        socket.on('newMsg', ({ chatId }) => {
            console.log('newMsg', chatId);
            initialize();
        })
    }, [])
    const initialize = () => {
        fetchData({
            path: `/chat?UserName1=${I.Username}&UserName2=${id}`,
            method: 'GET'
        }).then(res => {
            if (res.chats) {
                setChats(res.chats);
            }
        });
    }
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
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
                {id}&nbsp;<sub>{online}</sub>
            </div>
            {(data || !isEmptyObj(chats)) ?
                (isEmptyObj(chats) ?
                    <div className='loading'>Send your first Messege to {id}</div> :
                    <div className='chat-content'>
                        {isError && <div className='error'>{isError}</div>}
                        <ChatContent chats={chats} myUserName={I.Username} />
                        <div ref={ref} />
                    </div >
                ) :
                (isError ?
                    <div className='err-msg'>{isError}</div> :
                    (isPending && <div className='loading'><p>Loading Messages ...</p></div>)
                )
            }
            <form onSubmit={handleMsgSend}>
                <div className='newMsgSend'>
                    <input
                        type="text" value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        placeholder='New Message'
                    />
                    <div onClick={handleMsgSend} className='msg-send nav-icons'><img src={shareIcon} alt="" /></div>
                </div>
            </form>
        </div >
    );
}
export default Chat;