import { useEffect } from "react";
import useFetch from 'hooks/useFetch';
import { useParams } from 'react-router-dom';
import UserList from "components/User/UserList";
import UserLink from 'components/User/UserLink';
import Back from 'components/common/Back';
import More from 'components/common/More';
import 'css/User/Follows.css';
const Followers = ({ Attr }) => {
    const { id: Username } = useParams();
    const { fetchData, data, isError, isPending } = useFetch();
    useEffect(() => {
        fetchData({ path: `/user/Follows?Username=${Username}&Attr=${Attr}`, method: "GET" })
    }, [])

    return (
        <>
            <div className='follows-list-head'>
                <Back />
                <div><UserLink Username={Username} />'s {Attr === 'Followers_users' ? 'Followers' : 'Following'}</div>
                <More />
            </div>
            {data ?
                <UserList users={data} />
                :
                (isError ? <div className='error'>{isError}</div> :
                    (isPending &&
                        <div className='center-text-in-viewport'>Loading ...</div>
                    )
                )
            }
        </>
    );
}
export default Followers;