import { userIcon, heartIcon } from 'helpers/importIcons';
import { timeDiff } from 'helpers/time';
import UserLink from 'components/User/UserLink';
export default ({ c }) => {
    return (
        <div className='msg'>
            <div><img src={userIcon} alt="user" /></div>
            <div>
                <p>
                    <strong><UserLink Username={c.Username} /></strong>
                    {c.cmt}
                </p>
                <p>
                    <sub className='time'>{timeDiff(c.time)}</sub>
                    &nbsp;
                    <sub>Reply</sub>
                </p>
            </div>
            <div><img src={heartIcon} alt="" /></div>
            {/* {<div className='msg-content'>
                <span>{c.cmt}</span>
                <sub className='time'>{timeHourMin(c.time)} {c.timer && <i className='far fa-clock' style={{ fontSize: 'inherit' }} />}</sub>
            </div>} */}
        </div>
    );
}

