import { lazy, useEffect, useState, Suspense } from 'react';
import useFetch from 'hooks/useFetch';

import NoPostAvailable from 'components/Post/NoPostAvailable';

import { ScrollLoad } from 'helpers/HandleScroll';

const Post = lazy(() => import('./Post'));

const PostList = () => {

    const [page,setPage] = useState(0);
    const limit = 4;

    const { fetchData, isError, isPending } = useFetch();
    const [posts, setPosts] = useState(null);

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    useEffect(() => {
        ScrollLoad(setIsScrollLoad);
        LoadMore();
    }, []);

    const [noMorePosts, setNoMorePosts] = useState(false);
    const LoadMore = async () => {
        
        setIsScrollLoad(false);

        fetchData({
            path: '/public/posts?' + new URLSearchParams({ skip: page * limit, limit: limit }), method: "GET"
        })
        .then((res) => {
            if(res){

                if (res.length === 0 || res.length < 4) {
                    if(posts) setPosts([...posts,...res]);
                    else setPosts(res);
                    setNoMorePosts(true);
                    return;
                }
                if (posts) setPosts([...posts, ...res]);
                else setPosts(res);
                setPage(page+1);
            }
        })
    }

    return (
        <div className="post-list">
            {posts &&
                posts.length === 0 ? <NoPostAvailable /> :
                <div className="post-list-content">
                    {posts &&
                        <Suspense fallback={<div className='loading'><h3>Showing Posts ...</h3></div>}>
                            {
                                posts.map(post => (
                                    <Post key={post._id} post={post} />
                                ))
                            }
                        </Suspense>
                    }
                    {!isPending && (isScrollLoad || (posts && posts.length < 8)) &&
                        (noMorePosts ? <NoPostAvailable more={'More'} /> : (LoadMore() &&
                            <div className='load-more'>
                                <h3>Loading ...</h3>
                                <div style={{ height: '80px' }}></div>
                            </div>
                        )
                        )
                    }
                </div>
            }
            {isError && <div className='err-msg'>{isError}</div>}
            {isPending && <div className='loading'><h3>Fetching Posts ...</h3></div>}
        </div>
    );
}
export default PostList;