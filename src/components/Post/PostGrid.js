import { useState, useEffect, lazy, Suspense } from "react";
import useFetch from 'hooks/useFetch';

import NoPostAvailable from 'components/Post/NoPostAvailable';
import 'css/PostGrid.css';

import { ScrollLoad, HideScroll } from 'helpers/HandleScroll';

const PostGridImg = lazy(() => import('components/Post/PostGridImg'));

const PostGrid = ({ pathname }) => {

    const limit = 4;
    const [page, setPage] = useState(0);

    const { fetchData, isError, isPending } = useFetch();
    const [posts, setPosts] = useState(null)

    const [pointerPost, setPointerPost] = useState(false);

    const handlePointerDown = (e) => {
        setTimeout(() => {
            setPointerPost(e.target.src);
            HideScroll(true);
        }, 500);
    };
    const handlePointerUp = () => {
        setPointerPost(false);
        HideScroll(false);
    }

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    useEffect(() => {
        ScrollLoad(setIsScrollLoad);
        LoadMore();
    }, [])

    const [noMorePosts, setNoMorePosts] = useState(false);

    const LoadMore = async () => {
        setIsScrollLoad(false);
        // console.log(page);
        fetchData({
            path: pathname + new URLSearchParams({ skip: page * limit, limit: limit }), method: "GET"
        }).then((res) => {
            if (res.length === 0 || res.length < 4) {
                if (posts) setPosts([...posts, ...res]);
                else setPosts(res);
                setNoMorePosts(true);
                return;
            }
            if (posts) setPosts([...posts, ...res]);
            else setPosts(res);
            setPage(page + 1);
        })
        // if(data.result){
        //     const NewPosts = data.result;
        //     if (NewPosts.length === 0) setNoMorePosts(true);
        //     else setPosts([...posts, NewPosts[0]]);
        //     setIsScrollLoad(false);
        // }
        // else console.log("error",data);
    }

    return (
        <div id="Post-Grid">
            {posts &&
                posts.length === 0 ? <NoPostAvailable /> :
                <div id="Post-Grid-content">
                    <Suspense fallback={<div className='loading'><h3>Showing Posts ...</h3></div>}>
                        <div id="Post-Grid-container">
                            {posts &&
                                posts.map(post => (
                                    <PostGridImg key={post._id} post={post} handlePointerDown={handlePointerDown} />
                                ))
                            }
                        </div>
                    </Suspense>
                    {pointerPost &&
                        <div id='db-post' onPointerUp={handlePointerUp}>
                            <div className="close">X</div>
                            <img src={pointerPost} alt="db-post" onPointerUp={handlePointerUp} />
                        </div>
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
        </div >
    );
}
export default PostGrid;