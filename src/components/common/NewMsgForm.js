import { shareIcon } from 'helpers/importIcons';
import 'css/NewMsgForm.css';
export default ({ handleMsgSend }) => {

    return (
        <form onSubmit={handleMsgSend} id='newMsgForm'>
            <div className='newMsgSend'>
                <textarea id='newMsgIp' name='newMsgIp'
                    placeholder='New Message' autoComplete='off'
                    autoFocus
                />
                <button className='msg-send nav-icons'
                    onFocus={() => document.getElementById('newMsgIp').focus()}
                ><img src={shareIcon} alt="" /></button>
            </div>
        </form>
    );
}