import { useParams } from 'react-router-dom';

import Post from 'components/Post/Post';
import NotFound from 'pages/NotFound';

import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';

import { usePostListContext } from 'hooks/usePostListContext'

const PostDetails = () => {

    const { posts ,dispatch} = usePostListContext();

    const { id } = useParams();

    const { fetchData, data: post, setData: setPost, isError, isPending } = useFetch();

    useEffect(() => {
        if (posts) {
            const kk = posts.find(post => post._id === id);
            if (kk) {
                setPost(kk);
                return;
            }
        }
        fetchData({
            path: ('/posts/' + id),
            method: "GET"
        })
    }, [])

    return (
        <div className="post-details">
            {isError &&
                <div className='err-msg'>
                    {isError === "Not Found" ? <NotFound /> : <h2>{isError}</h2>}
                </div>
            }
            {isPending && <div className='loading'><h2>Fetching Post ...</h2></div>}

            {post && <Post post={post} />}
        </div>
    );
}
export default PostDetails;