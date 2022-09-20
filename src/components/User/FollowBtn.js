import { useEffect, useState } from 'react';
import { useAuthContext } from 'hooks/context/useAuthContext';
import useFetch from 'hooks/useFetch';

const FollowBtn = ({ user }) => {
    const { fetchData, data, isError, isPending } = useFetch();
    const { user: I } = useAuthContext();
    const [iFollow, setIFollow] = useState(false);
    
    useEffect(() => {
        const i = JSON.parse(localStorage.getItem('Following_users'));
        const k = i.find((storeuser) => storeuser._id === user._id);
        setIFollow(k);
    }, []);
    
    useEffect(() => {
        if(!isError) setIFollow(!iFollow);
    }, [data]);
    
    const handleFollow = () => {
        fetchData({
            path: '/user/' + I._id,
            method: 'PATCH',
            payload: {
                "_id2": user._id,
                "update": "following_followers_users",
                "Username1": I.Username,
                "Username2": user.Username,
                "updateAdd": !iFollow
            }
        })
    };
    if (I.Username !== user.Username) {
        return (
            <button onClick={handleFollow} className={`follow-unfollow ${isPending ? '' : (iFollow ? '' : 'follow-active')}`}>
                {isError ?
                    isError :
                    (isPending ? 'Checking ...' : (iFollow ? 'Unfollow' : 'Follow'))}
            </button>
        );
    }
}
export default FollowBtn;