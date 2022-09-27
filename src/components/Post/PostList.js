import { lazy, useEffect, useState, Suspense } from 'react';
import { usePostListContext } from 'hooks/context/usePostListContext'

import useFetch from 'hooks/useFetch';
import NoPostAvailable from 'components/Post/NoPostAvailable';

import { ScrollLoad } from 'helpers/HandleScroll';
const Post = lazy(() => import('./Post'));

let initPostList;

const PostList = () => {

    const { posts, page, noMorePosts, dispatch } = usePostListContext();

    const limit = 2;

    const { fetchData, isError, isPending } = useFetch();

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    const { ScrollListen } = ScrollLoad(setIsScrollLoad);

    const initialize = () => {
        console.log('initialized');
        dispatch({ type: 'REFRESH' })
        ScrollListen(true);
        LoadMore();
    }

    useEffect(() => {
        ScrollListen(true);
        initPostList = initialize;
        if (posts.length === 0) LoadMore();
    }, []);

    const LoadMore = async () => {
        // console.log('Loading Posts',page);
        ScrollListen(false);
        fetchData({
            path: '/posts/iFollow?' + new URLSearchParams({ skip: page * limit, limit: limit }), method: "GET"
        }).then(res => {
            if (res) {
                if (res.length > 0) {
                    dispatch({ type: 'ADD_POSTS', payload: [...res] });
                }
                if (res.length === 0 || res.length < limit) {
                    dispatch({ type: 'SET_NO_MORE_POSTS' });
                    return;
                }
                ScrollListen(true);
            }
        })
    }

    return (
        <div className="post-list">
            {posts.length === 0 ?
                (isError ?
                    <div className='err-msg'>{isError}</div> :
                    (isPending ?
                        <div className='loading'><h3>Fetching Posts ...</h3></div> :
                        <NoPostAvailable />
                    )
                ) :
                <div className="post-list-content">
                    <Suspense fallback={<div className='loading'><h3>Showing Posts ...</h3></div>}>
                        {posts.map(post =>
                            <Post key={post._id} post={post} />
                        )}
                        {!isPending &&
                            (noMorePosts ? <NoPostAvailable more={'More'} /> :
                                ((isScrollLoad || posts.length < 3) &&
                                    LoadMore()
                                )
                            )
                        }
                    </Suspense>
                    {isError ?
                        <div className='error'>{isError}</div> :
                        (isPending && <div className='load-more'><h3>Fetching More Posts ...</h3></div>)
                    }
                </div>
            }
        </div>
    );
}
export { PostList, initPostList };