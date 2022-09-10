import { useState, useEffect, lazy, Suspense } from "react";
import useFetch from 'hooks/useFetch';

import NoPostAvailable from 'components/Post/NoPostAvailable';
import 'css/PostGrid.css';

import { ScrollLoad, HideScroll } from 'helpers/HandleScroll';

const PostGridImg = lazy(() => import('components/Post/PostGridImg'));

let initPostGrid;

const PostGrid = ({ pathname }) => {

    const [page, setPage] = useState(0);
    const limit = 4;

    const { fetchData, isError, isPending } = useFetch();

    const [posts, setPosts] = useState(null)
    const [noMorePosts, setNoMorePosts] = useState(false);
    const [pointerPost, setPointerPost] = useState(false);

    const showPost = (e) => {
        HideScroll(true);
        setPointerPost(e.target.src);
    };
    const hideDbPost = () => {
        HideScroll(false);
        setPointerPost(false);
    }

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    const { ScrollListen } = ScrollLoad(setIsScrollLoad);

    const initialize = () => {
        console.log('initialized');
        setPosts(null);
        setPage(0);
        LoadMore();
        setNoMorePosts(false);
    }

    useEffect(() => {
        ScrollListen(true);
        initPostGrid = initialize;
        LoadMore();
    }, [])

    const LoadMore = async () => {
        ScrollListen(false);
        fetchData({
            path: pathname + new URLSearchParams({ skip: page * limit, limit: limit }), method: "GET"
        }).then(res => {
            if (res) {
                if (posts) setPosts([...posts, ...res]);
                else setPosts(res);
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
        <div id="Post-Grid">
            {isError ? <div className='err-msg'>{isError}</div> :
                (posts &&
                    (posts.length === 0 ? <NoPostAvailable /> :
                        <div id="Post-Grid-content">
                            <Suspense fallback={<div className='loading'><h3>Showing Posts ...</h3></div>}>
                                <div id="Post-Grid-container">
                                    {posts.map(post =>
                                        <PostGridImg key={post._id} post={post} showPost={showPost} HideScroll={HideScroll} />
                                    )}
                                </div>
                            </Suspense>
                            {pointerPost &&
                                <div id='db-post'>
                                    <div className="close" onClick={hideDbPost}>X</div>
                                    <img src={pointerPost} alt="db-post" />
                                </div>
                            }
                            {!isPending &&
                                (noMorePosts ? <NoPostAvailable more={'More'} /> :
                                    ((isScrollLoad || posts.length < 10) &&
                                        LoadMore()
                                    )
                                )
                            }
                        </div>
                    )
                )}
            {isPending && <div className={page === 0 ? 'loading' : 'load-more'}><h3>Fetching {page !== 0 && 'More'} Posts ...</h3></div>}
        </div >
    );
}
export { PostGrid, initPostGrid };