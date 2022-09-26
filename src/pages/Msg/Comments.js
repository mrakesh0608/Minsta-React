import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuthContext } from 'hooks/context/useAuthContext';
import useFetch from 'hooks/useFetch';

import { isEmptyObj } from 'helpers/function';
import { todayDate } from 'helpers/time';

import Back from 'components/common/Back';
import CommentCard from 'components/Chat/CommentCard';
import NewMsgForm from 'components/common/NewMsgForm';

import 'css/chat.css';
export default () => {

    const { id } = useParams();
    const { user: I } = useAuthContext();
    const { fetchData, data, isError, isPending } = useFetch();

    const [cmts, setCmts] = useState({});

    useEffect(() => {
        fetchData({
            path: `/comment?id=${id}`,
            method: 'GET'
        }).then(res => {
            if (res && res.comments) {
                setCmts(res.comments);
            }
        });
    }, [])

    const handleMsgSend = (e) => {
        e.preventDefault();
        const newCmt = e.target.newMsgIp.value;

        if (newCmt) {
            e.target.newMsgIp.value = '';

            if (!cmts[todayDate()]) cmts[todayDate()] = [];
            const MsgLoad = { Username: I.Username, cmt: newCmt, time: new Date() }
            cmts[todayDate()].push({ timer: true, ...MsgLoad });
            setCmts({ ...cmts });

            if (data) {
                fetchData({
                    path: `/comment?id=${id}&Username=${I.Username}&cmt=${newCmt}`,
                    method: 'POST'
                }).then(res => {
                    console.log(res);
                    if (res.comments) setCmts(res.comments);
                });
            }
        }
    }
    return (
        <div className='chat'>
            <div className='cmt-head'>
                <Back />
                <div>
                    {/* <UserLink Username={id} /> */}
                    Comments
                </div>
                <p></p>
            </div>
            {(data || !isEmptyObj(cmts)) ?
                <>
                    {isEmptyObj(cmts) ?
                        <div className='div-msg'>Be the first one to comment on this post</div> :
                        <div className='chat-content'>
                            {Object.keys(cmts).map((day, key) =>
                                <div key={key}>
                                    <div className='chat-day'><span>{day}</span></div>
                                    {cmts[day].map((c, key) =>
                                        <CommentCard c={c} key={key} />
                                    )}
                                </div>
                            )}
                        </div >
                    }
                    <NewMsgForm handleMsgSend={handleMsgSend} />
                </> :
                (isError ?
                    <div className='err-msg'>{isError}</div> :
                    (isPending && <div className='loading'><p>Loading Comments ...</p></div>)
                )
            }
        </div >
    );
}