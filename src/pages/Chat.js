import { Link, useParams, useNavigate } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';

import 'css/chat.css';

const Chat = () => {
    const { id } = useParams();
    const { user: I } = useAuthContext();
    const { fetchData, data, isError, isPending } = useFetch();

    const [newMsg, setNewMsg] = useState('');
    useEffect(() => {
        initialize();
        const interval = setInterval(() => {
            initialize();
        }, 3000)
        return function cleanup() {
            // console.log("cleaning up");
            clearInterval(interval);
        };
    }, [])
    const initialize = () => {
        fetchData({
            path: `/chat?UserName1=${I.Username}&UserName2=${id}`,
            method: 'GET'
        }).then(res=>console.log(res))
    }
    const handleMsgSend = (e) => {
        e.preventDefault();
        if (newMsg) {
            setNewMsg('');
            fetchData({
                path: `/chat?id=${data._id}&UserName=${I.Username}&msg=${newMsg}`,
                method: 'POST'
            })
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
                (data.chats? Object.keys(data.chats).map((day, key) =>
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
                                        <div className='triangle triangle-right'></div>
                                    </div> :
                                    <div className='msg'>
                                        <div className='triangle triangle-left'></div>
                                        <div className='msg-content'>
                                            <span>{chat.msg}</span>
                                            <sub className='time'>{time(chat.time)}</sub>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>):<div className='loading'>Send your first Messege to {id}</div>
                ) :
                isError ?
                    <div>{isError}</div> :
                    (isPending && <div className='loading'><p>Loading ...</p></div>)}
            <form onSubmit={handleMsgSend}>
                <div className='newMsgSend'>
                    <input
                        type="text" value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        placeholder='new message'
                    />
                    <button onClick={handleMsgSend}>Send</button>
                </div>
            </form>
        </div >
    );
}
export default Chat;