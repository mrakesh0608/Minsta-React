import { lazy, useEffect, useState, Suspense } from 'react';
import useFetch from 'hooks/useFetch';

import NoPostAvailable from 'components/Post/NoPostAvailable';

import { ScrollLoad } from 'helpers/HandleScroll';
import { usePostListContext } from 'hooks/usePostListContext'
const Post = lazy(() => import('./Post'));

let init;

const PostList = () => {

    const { posts, dispatch } = usePostListContext();

    const [page, setPage] = useState(0);
    const limit = 2;

    const { fetchData, isError, isPending } = useFetch();
    const [noMorePosts, setNoMorePosts] = useState(false);

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    const { ScrollListen } = ScrollLoad(setIsScrollLoad);

    const initialize = () => {
        console.log('initialized');
        dispatch({ type: 'REFRESH' })
        setPage(0);
        LoadMore();
    }

    useEffect(() => {
        ScrollListen(true);
        init = initialize;
        if(!posts) LoadMore();
    }, []);

    const LoadMore = async () => {
        console.log('Loading Posts');
        ScrollListen(false);
        fetchData({
            path: '/posts/iFollow?' + new URLSearchParams({ skip: page * limit, limit: limit }), method: "GET"
        }).then(res => {
            if (res) {
                if (res.length > 0) {
                    dispatch({ type: 'ADD_POSTS', payload: [...res] });
                }
                if (res.length === 0 || res.length < limit) {
                    setNoMorePosts(true);
                    return;
                }
                setPage(page + 1);
                ScrollListen(true);
            }
        })
    }

    return (
        <div className="post-list">
            {isError ? <div className='err-msg'>{isError}</div> :
                (posts &&
                    (posts.length === 0 ? <NoPostAvailable /> :
                        <div className="post-list-content">
                            <Suspense fallback={<div className='loading'><h3>Showing Posts ...</h3></div>}>
                                {posts.map(post =>
                                    <Post key={post._id} post={post} />
                                )}
                            </Suspense>
                            {!isPending &&
                                (noMorePosts ? <NoPostAvailable more={'More'} /> :
                                    ((isScrollLoad || posts.length < 3) &&
                                        LoadMore()
                                    )
                                )
                            }
                        </div>
                    )
                )}
            {isPending && <div className={page === 0 ? 'loading' : 'load-more'}><h3>Fetching {page !== 0 && 'More'} Posts ...</h3></div>}
        </div>
    );
}
export { PostList, init };