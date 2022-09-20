import { Link } from 'react-router-dom';
import { userIcon } from 'helpers/importIcons';
import { MsgTime } from 'helpers/time';
import { useEffect ,useState} from 'react';
import { useSocketContext } from 'hooks/context/useSocketContext';
export default ({ d, Username ,onlineUsers}) => {

    const [noOfMsg,setNoOfMsg] = useState(0);
    const { socket } = useSocketContext();
    useEffect(()=>{
        socket.emit('joinChat', { chatId: d._id });
        socket.on('newMsg', ({ chatId }) => {
            if(chatId === d._id){    
                console.log(chatId);
                setNoOfMsg(noOfMsg+1);
            }
        });
        // console.log(d);
        return ()=>{
            console.log('cleaned up');
        }
    },[d])
    useEffect(()=>{
        // console.log(onlineUsers);
    },[onlineUsers])
    return (
        <Link className='msg-card' to={`/messenger/${Username}`}>
            <div className='userimg meta1'>
                <img src={userIcon} alt="user" className='icons' />
            </div>
            <div className='meta2'>
                <div className='Username-time'>
                    <span className='Username'>{Username}<span className={onlineUsers?.includes(Username)?'online':'offline'}>&#9679;</span> </span>
                    <span className='time'>{d.lastMsg && MsgTime(d.lastMsg.time)}</span>
                </div>
                <div className='meta2-2'>
                    <span className='last-msg'>{d.lastMsg ? d.lastMsg.msg : 'send your first messege'}</span>
                    <span className='no-of-msg'>{noOfMsg!==0 && <span>{noOfMsg}</span>}</span>
                </div>
            </div>
        </Link>
    );
}