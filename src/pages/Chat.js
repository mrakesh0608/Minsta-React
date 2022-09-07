import { useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import { shareIcon } from 'helpers/importsIcons';

import 'css/chat.css';
import GetTriangle from 'components/common/GetTriangle';
const Chat = () => {

    const { id } = useParams();
    const { user: I } = useAuthContext();
    const { fetchData, data, isError, isPending } = useFetch();

    const [newMsg, setNewMsg] = useState('');
    const ref = useRef();

    useEffect(() => {
        initialize();
        const interval = setInterval(() => {
            initialize();
        }, 3000)
        setTimeout(() => {
            ref.current?.scrollIntoView({ behavior: "smooth" })
        }, 2000);
        return function cleanup() {
            // console.log("cleaning up");
            clearInterval(interval);
        };
    }, [])
    const initialize = () => {
        fetchData({
            path: `/chat?UserName1=${I.Username}&UserName2=${id}`,
            method: 'GET'
        }).then(res => console.log(res))
    }
    const handleMsgSend = (e) => {
        e.preventDefault();
        if (newMsg) {
            setNewMsg('');
            ref.current?.scrollIntoView({ behavior: "smooth" });
            fetchData({
                path: `/chat?id=${data._id}&UserName=${I.Username}&msg=${newMsg}`,
                method: 'POST'
            })
            setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: "smooth" })
            }, 2000);
        }
    }
    const time = (time) => {
        time = new Date(time)
        return time.toLocaleString('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }
    return (
        <div className='chat'>
            <div className='chat-head'>{id}</div>
            {data ?
                (data.chats ? Object.keys(data.chats).map((day, key) =>
                    <div key={key}>
                        <div className='chat-day'><span>{day}</span></div>
                        {data.chats[day].map((chat, key) =>
                            <div key={key} >
                                {chat.UserName === I.Username ?
                                    <div className='msg myMsg'>
                                        <div className='msg-content'>
                                            <span>{chat.msg}</span>
                                            <sub className='time'>{time(chat.time)}</sub>
                                        </div>
                                        <GetTriangle pos={'right'} />
                                    </div> :
                                    <div className='msg'>
                                        <GetTriangle pos={'left'} />
                                        <div className='msg-content'>
                                            <span>{chat.msg}</span>
                                            <sub className='time'>{time(chat.time)}</sub>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>) : <div className='loading'>Send your first Messege to {id}</div>
                ) :
                isError ?
                    <div>{isError}</div> :
                    (isPending && <div className='loading'><p>Loading Messages ...</p></div>)}
            <form onSubmit={handleMsgSend} ref={ref}>
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