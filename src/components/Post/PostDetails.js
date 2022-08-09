import { useParams } from 'react-router-dom';

import Post from 'components/Post/Post';
import NotFound from 'pages/NotFound';

import {REST_API_Async} from 'helpers/REST_API';

const PostDetails = () => {

    const { id } = useParams();

    const { data: post, isPending, isError } = REST_API_Async({path:('/posts/'+id),method:"GET"});

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