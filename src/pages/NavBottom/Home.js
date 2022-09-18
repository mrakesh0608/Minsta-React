import HomeHeadNav from 'components/Nav/HomeHeadNav';
import {PostList} from 'components/Post/PostList';

const Home = () => {
    return (
        <div id="Home">
            <HomeHeadNav />
            <PostList />
        </div>
    );
}
export default Home;