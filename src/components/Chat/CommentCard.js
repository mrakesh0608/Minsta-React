import { userIcon, heartIcon } from 'helpers/importIcons';
import { timeDiff } from 'helpers/time';
import UserLink from 'components/User/UserLink';

import 'css/CommentCard.css';

export default ({ c }) => {
    return (
        <div className='cmt'>
            <div><img src={userIcon} alt="user" /></div>
            <div>
                <p>
                    <strong><UserLink Username={c.Username} /></strong>
                    <span>{c.cmt}</span>
                </p>
                <p>
                    <sub className='time'>{timeDiff(c.time)}</sub>
                    &nbsp;
                    <sub>Reply</sub>
                </p>
            </div>
            <div><img src={heartIcon} alt="" /></div>
        </div>
    );
}

