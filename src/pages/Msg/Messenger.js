import { useEffect, useState } from 'react';
import { useSocketContext } from 'hooks/context/useSocketContext';
import { useAuthContext } from 'hooks/context/useAuthContext';

import useFetch from 'hooks/useFetch';

import MessengerCard from 'components/Chat/MessengerCard';
import Back from 'components/common/Back';
import More from 'components/common/More';

import 'css/Messenger.css';

export default () => {

    const { socket } = useSocketContext();
    const { user: I } = useAuthContext();
    const [onlineUsers, setOnlineUsers] = useState(null);
    const { fetchData, data, isError, isPending } = useFetch();

    useEffect(() => {
        socket.on("onlineUsers", (users) => {
            const k = [];
            users.forEach(element => k.push(element.Username));
            // console.log(k);
            setOnlineUsers(k);
        });
        fetchData({
            path: `/chat/getAllMyChats`, method: 'GET'
        }).then((res) => {
            // console.log(res)
        });
    }, [])

    const getOtherUsername = (u1, u2) => { return I.Username === u1 ? u2 : u1 }

    return (
        <div id="Messenger">
            <div id="Messenger-content">
                <div className='messenger-head'>
                    <Back />
                    <div><span>Messenger</span></div>
                    <More />
                </div>
                {data ?
                    <>{data.length === 0 ?
                        <p className='center-text-in-viewport'>No Messages</p> :
                        <div className='msg-list' id='msg-list'>
                            {data.map((d, key) =>
                                <MessengerCard key={key} d={d} Username={getOtherUsername(d.Username1, d.Username2)} onlineUsers={onlineUsers} />
                            )}
                        </div>
                    }</>
                    :
                    (isError ?
                        <div className='err-msg'>{isError}</div> :
                        (isPending && <div className='center-text-in-viewport'><p>Loading Messages ...</p></div>)
                    )
                }
            </div>
        </div>
    );
}