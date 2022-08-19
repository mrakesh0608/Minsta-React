import Search from 'components/common/Search';
import PostGrid from 'components/Post/PostGrid';

const Explore = () => {
    return (
        <div id="Explore">
            <Search />
            <PostGrid pathname={'/posts/All?'}/>
        </div>
    );
}
export default Explore;