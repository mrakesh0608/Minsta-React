import { useState,useEffect } from 'react';

import {REST_API_Async} from 'helpers/REST_API';
import { handleLikes } from 'helpers/HandlePostEvents';

const PostImg = ({ post, setPost }) => {
    const { data: image, isPending, isError } = REST_API_Async({path:'/post-img/' + post.post_image_id,method:"GET"});

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, [])

    return (
        <div className="post-content" onDoubleClick={(e) => handleLikes(e, post, setPost)}>
            {isError && <div className='img-load'>{isError}</div>}
            {isPending && <div className='img-load'>Fetching Image ...</div>}

            {image &&
                <div className='img-div'>
                    <img src={image.imgData.toString('base64')} alt={post.img_name} className='post-content-img' />

                    {windowWidth > 600 &&
                        <img src={image.imgData.toString('base64')} alt={post.img_name} className='bgImgblur' />
                    }
                </div>
            }
        </div>
    );
}

export { PostImg };