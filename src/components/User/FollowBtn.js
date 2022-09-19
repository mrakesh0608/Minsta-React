const FollowBtn = ({username}) => {
    const { fetchData, simpleFetch, data: user, isError, isPending } = useFetch();
    const handleFollow = () => {
        fetchData({
            path: '/user/' + I._id,
            method: 'PATCH',
            payload: {
                "_id2": user._id,
                "update": "following_followers_users",
                "Username1": I.Username,
                "Username2": user.Username,
                "updateAdd": !user.iFollow
            }
        }).then(res => {
            if (res) { }
            else navigate('/notfound/No Such User')
        })
    };

    return (
        <button onClick={handleFollow} className={isPending ? '' : (user.iFollow ? '' : 'follow')}>
            {isPending ? 'Checking ...' : (user.iFollow ? 'Unfollow' : 'Follow')}
        </button>
    );
}
export default FollowBtn;