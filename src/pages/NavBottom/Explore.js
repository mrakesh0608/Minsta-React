import Search from 'components/common/Search';
import PostGrid from 'components/Post/PostGrid';

const Explore = () => {
    return (
        <div id="Explore">
            <Search />
            <PostGrid pathname={'/public/posts?'}/>
        </div>
    );
}
export default Explore;