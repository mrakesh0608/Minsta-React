import { lazy, useEffect, useState, Suspense } from 'react';

import NoPostAvailable from 'components/Post/NoPostAvailable';

import { ScrollLoad } from 'helpers/HandleScroll';
import {REST_API_Async,REST_API_Sync} from 'helpers/REST_API';

const Post = lazy(() => import('./Post'));

const PostList = () => {

    const limit = 4;

    const { data: posts, setData: setPosts, isPending, isError } = REST_API_Async({path:'/posts?' + new URLSearchParams({skip: 0,limit: limit}),method:"GET"});

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    useEffect(() => {
        ScrollLoad(setIsScrollLoad);
    }, []);

    const [noMorePosts, setNoMorePosts] = useState(false);
    let pages = 1;
    const LoadMore = async () => {
        const data = await REST_API_Sync({path:'/posts?skip=' + pages*limit + '&limit=' + limit,method:"GET"});
        if(data.result){
            pages++;
            const NewPosts = data.result;
            if (NewPosts.length === 0) setNoMorePosts(true);
            else setPosts([...posts, NewPosts[0]]);
            // console.log(NewPosts);
            setIsScrollLoad(false);
        }
        else console.log("error",data);
    }

    return (
        <div className="post-list">
            {isError && <div className='err-msg'>{isError}</div>}
            {isPending && <div className='loading'><h3>Fetching Posts ...</h3></div>}
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

        </div>
    );
}
export default PostList;