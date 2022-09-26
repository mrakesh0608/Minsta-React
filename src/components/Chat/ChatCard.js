import { GetTriangle } from 'components/Chat/GetTriangle';
import { timeHourMin } from 'helpers/time';

import 'css/chatCard.css';

export default ({ chat, myUsername, day }) => {
    
    return (chat.Username === myUsername ?
        <div className='msg myMsg'>
            <div className='msg-content'>
                <span>{chat.msg}</span>
                <sub className='time'>{timeHourMin(chat.time)} {chat.timer && <i className='far fa-clock' style={{ fontSize: 'inherit' }} />}</sub>
            </div>
            <GetTriangle pos={'right'} Username={chat.Username} day={day} />
        </div> :
        <div className='msg'>
            <GetTriangle pos={'left'} Username={chat.Username} day={day} />
            <div className='msg-content'>
                <span>{chat.msg}</span>
                <sub className='time'>{timeHourMin(chat.time)}</sub>
            </div>
        </div>
    )
}