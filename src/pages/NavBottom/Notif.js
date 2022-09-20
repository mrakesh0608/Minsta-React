import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from 'hooks/context/useAuthContext';
import useFetch from 'hooks/useFetch';

import { timeHourMin } from 'helpers/time';

import UserLink from 'components/User/UserLink';
import 'css/Notif.css';

let initNotif;

const Notif = () => {
    const { user } = useAuthContext();
    const { fetchData, data, isError, isPending } = useFetch();
    useEffect(() => {
        initialize();
        initNotif = initialize;
    }, [])
    const initialize = () => {
        fetchData({
            path: `/notif?userId=${user._id}`,
            method: 'GET'
        })
    }

    return (
        <div id="Notif">
            <div className="nav-head hideOnScroll hideOnScroll-head"><h2>Activity</h2></div>
            <div id="Notif-content">
                {data ?
                    <>
                        {isPending && <div className='load-more'><p>Ruk, dekh raha hu ...</p></div>}
                        {data.notif ? Object.keys(data.notif).reverse().map((day, key) =>
                            <div key={key} className='notif-temp'>
                                {data.notif[day].map((notif, key) =>
                                    <div key={key} className='notif-lable'>
                                        {['Following', 'UnFollowed'].includes(notif.Type) ?
                                            <p><UserLink Username={notif.Username} /> {notif.Type} you.</p> :
                                            <p><UserLink Username={notif.Username} /> is {notif.Type} your {notif.ReelId ? <Link to={`/reels/${notif.ReelId}`}>reel</Link> :
                                                <Link to={`/posts/${notif.PostId}`}>post</Link>} .</p>
                                        }
                                        <div>{timeHourMin(notif.time)}</div>
                                    </div>
                                )}
                                <div className='notif-day'><span>{day}</span></div>
                            </div>) : <div className='loading'><h3>No Notifications</h3></div>
                        }
                    </> :
                    (isError ?
                        <div className='err-msg'>{isError}</div> :
                        (isPending && <div className='loading'><p>Loading Notifications ...</p></div>)
                    )
                }
            </div>
        </div>
    );
}
export { Notif, initNotif };