import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

import HomeHeadNav from 'components/common/HomeHeadNav';
import PostList from 'components/Post/PostList';

const Home = () => {

    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            const myparam = location.state.params;
            alert("Welcome " + myparam);
        }
    }, [location.state])

    return (
        <div id="Home">
            <HomeHeadNav />
            <PostList />
        </div>
    );
}
export default Home;