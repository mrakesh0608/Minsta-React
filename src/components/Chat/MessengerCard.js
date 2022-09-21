import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useSocketContext } from 'hooks/context/useSocketContext';

import { userIcon } from 'helpers/importIcons';
import { MsgTime } from 'helpers/time';

const numOfMsg = {};

export default ({ d, Username, onlineUsers }) => {

    const { socket } = useSocketContext();
    const [lastMsg, setLastMsg] = useState(null);

    useEffect(() => {
        socket.emit('joinChat', { chatId: d._id });
        setLastMsg({ msg: `${d.lastMsg ? d.lastMsg.msg : 'send your first messege'}`, time: d.lastMsg?.time });
        numOfMsg[d._id] = 0;
        // console.log(numOfMsg);
        socket.on(`newMsg-${d._id}`, ({ chatId, MsgLoad }) => {
            // console.log(chatId, MsgLoad);
            if (chatId === d._id) {
                msgUp(`msg-card-${d._id}`);
                setLastMsg(MsgLoad);
                numOfMsg[d._id] = numOfMsg[d._id] + 1;
            }
        });
        return () => {
            delete numOfMsg[d._id];
            // console.log('cleaned up');
        }
    }, [d]);
    useEffect(() => {
        // console.log(onlineUsers);
    }, [onlineUsers])

    const msgUp = (chatId) => {
        const parent = document.getElementById('msg-list');
        // console.log(firstChild.id, chatId);
        if (parent.childNodes[0].id !== chatId) {
            const k = document.getElementById(chatId);
            k?.remove();
            parent.prepend(k);
        }
    }

    return (
        <Link className='msg-card' to={`/messenger/${Username}`} id={`msg-card-${d._id}`}>
            <div className='userimg meta1'>
                <img src={userIcon} alt="user" className='icons' />
            </div>
            <div className='meta2'>
                <div className='Username-time'>
                    <span className='Username'>{Username}<span className={onlineUsers?.includes(Username) ? 'online' : 'offline'}>&#9679;</span> </span>
                    <span className='time'>{MsgTime(lastMsg?.time)}</span>
                </div>
                <div className='meta2-2'>
                    <span className='last-msg'>{lastMsg?.msg}</span>
                    <span className='no-of-msg'>{numOfMsg[d._id] !== 0 && <span>{numOfMsg[d._id]}</span>}</span>
                </div>
            </div>
        </Link>
    );
}