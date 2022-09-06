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
        // setInterval(() => {
        //     initialize();
        // }, 3000)
    }, [])
    const initialize = () => {
        fetchData({
            path: `/chat?UserName1=${I.Username}&UserName2=${id}`,
            method: 'GET'
        }).then(res => console.log(res));
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
                data.chats.map((chat, key) =>
                    <div key={key} >{chat.UserName === I.Username ?
                        <div className='msg myMsg'>
                            <span>{chat.msg}<sub className='time'>{time(chat.createdAt)}</sub></span>
                            <div className='triangle triangle-right'></div>
                        </div> :
                        <div className='msg'>
                            <div className='triangle triangle-left'></div>
                            <span>{chat.msg}<sub className='time'>{time(chat.createdAt)}</sub></span>
                        </div>
                    }</div>
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