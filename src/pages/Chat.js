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
        setInterval(() => {
            initialize();
        }, 3000)
    }, [])
    const initialize = () => {
        fetchData({
            path: `/chat?UserName1=${I.Username}&UserName2=${id}`,
            method: 'GET'
        })
    }
    const handleMsgSend = (e) => {
        e.preventDefault();
        if(newMsg){
            setNewMsg('');
            fetchData({
                path: `/chat?id=${data._id}&UserName=${I.Username}&msg=${newMsg}`,
                method: 'POST'
            })
        }
    }
    return (
        <div className='chat'>
            {data && data.chats.map((msg, key) =>
                <div key={key}
                    className={'msg ' + (msg.UserName === I.Username ? "myMsg" : '')}>
                    <span>{msg.msg}</span>
                </div>
            )}
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