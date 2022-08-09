import { useState, useEffect, lazy, Suspense } from "react";

import NoPostAvailable from 'components/Post/NoPostAvailable';
import 'css/PostGrid.css';

import { ScrollLoad ,HideScroll} from 'helpers/HandleScroll';

import {REST_API_Async,REST_API_Sync} from 'helpers/REST_API';
const PostGridImg = lazy(() => import('components/Post/PostGridImg'));


const PostGrid = ({ username }) => {

    if (username){
        username = 'username=' + username+'&';
    }
    else username = '';

    const limit = 8;
    const { data: posts, setData: setPosts, isPending, isError } = REST_API_Async({path:'/posts?' + new URLSearchParams({skip: 0,limit: limit}),method:"GET"});

    const [pointerPost, setPointerPost] = useState(false);

    const handlePointerDown = (e) => {

        setTimeout(() => {
            setPointerPost(e.target.src);
            HideScroll(true);
        }, 250);
    };
    const handlePointerUp = () => {
        setTimeout(() => {
            setPointerPost(false);
            HideScroll(false);
        }, 200);
    }

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    useEffect(() => {
        ScrollLoad(setIsScrollLoad);
    }, [])

    const [noMorePosts, setNoMorePosts] = useState(false);
    let pages = 1;
    const LoadMore = async () => {
        const data = await REST_API_Sync({path:'posts?skip=' + pages*limit + '&limit=' + limit,method:"GET"});
        pages++;
        if(data.result){
            const NewPosts = data.result;
            if (NewPosts.length === 0) setNoMorePosts(true);
            else setPosts([...posts, NewPosts[0]]);
            setIsScrollLoad(false);
        }
        else console.log("error",data);
    }

    return (
        <div id="Post-Grid">
            {isError && <div className='err-msg'>{isError}</div>}
            {isPending && <div className='loading'><h3>Fetching Posts ...</h3></div>}
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
                    {!isPending && (isScrollLoad || posts.length < 4) &&
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
        </div >
    );
}

export default PostGrid;