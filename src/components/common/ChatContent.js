import GetTriangle from 'components/common/GetTriangle';
import { timeHourMin } from 'helpers/time';
const ChatContent = ({ chats, myUserName }) => {
    return (
        Object.keys(chats).map((day, key) =>
            <div key={key}>
                <div className='chat-day'><span>{day}</span></div>
                {chats[day].map((chat, key) =>
                    <div key={key} >
                        {chat.UserName === myUserName ?
                            <div className='msg myMsg'>
                                <div className='msg-content'>
                                    <span>{chat.msg}</span>
                                    <sub className='time'>{timeHourMin(chat.time)} {chat.timer && <i className='far fa-clock' style={{ fontSize: 'inherit' }} />}</sub>
                                </div>
                                <GetTriangle pos={'right'} />
                            </div> :
                            <div className='msg'>
                                <GetTriangle pos={'left'} />
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