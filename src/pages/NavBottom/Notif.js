import { useEffect } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import useFetch from 'hooks/useFetch';
import { Link } from 'react-router-dom';
import {timeHourMin} from 'helpers/time';
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
                    (data.notif ? Object.keys(data.notif).reverse().map((day, key) =>
                        <div key={key} className='notif-temp'>
                            {data.notif[day].map((notif, key) =>
                                <div key={key} className='notif-lable'>
                                    {(notif.Type === 'Following' || notif.Type === 'UnFollowed') ?
                                        <p><Link to={`/user/${notif.UserName}`}>{notif.UserName}</Link> {notif.Type} you.</p>:
                                        <p><Link to={`/user/${notif.UserName}`}>{notif.UserName}</Link> is {notif.Type} your <Link to={`/posts/${notif.PostId}`}>post</Link> .</p>
                                    }
                                    <div>{timeHourMin(notif.time)}</div>
                                </div>
                            )}
                            <div className='notif-day'><span>{day}</span></div>
                        </div>) : <div className='loading'><h4>No Notifications</h4></div>
                    ) :
                    isError ?
                        <div className='err-msg'>{isError}</div> :
                        (isPending && <div className='loading'><p>Loading Notifications ...</p></div>)}
            </div>
        </div>
    );
}
export { Notif, initNotif };