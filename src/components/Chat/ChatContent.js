import { GetTriangle } from 'components/Chat/GetTriangle';
import { timeHourMin } from 'helpers/time';
const ChatContent = ({ chats, myUsername }) => {
    return (
        Object.keys(chats).map((day, key) =>
            <div key={key}>
                <div className='chat-day'><span>{day}</span></div>
                {chats[day].map((chat, key) =>
                    <div key={key} >
                        {chat.Username === myUsername ?
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
                        }
                    </div>
                )}
            </div>
        )
    )
}
export default ChatContent;