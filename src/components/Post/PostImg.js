import { useState,useEffect } from 'react';
import useFetch from 'hooks/useFetch';

const PostImg = ({ post, setPost,handleLikes}) => {
    const {fetchData,data: image,isError,isPending} = useFetch();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        fetchData({path:'/post-img/' + post.imgId,method:"GET"});
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, [])

    return (
        <div className="post-content" onDoubleClick={(e) => handleLikes(e, post, setPost)}>
            {isError && <div className='img-load'>{isError}</div>}
            {isPending && <div className='img-load'>Fetching Image ...</div>}

            {image &&
                <div className='img-div'>
                    <img src={image.imgData.toString('base64')} alt={post.imgName} className='post-content-img' />

                    {windowWidth > 600 &&
                        <img src={image.imgData.toString('base64')} alt={post.imgName} className='bgImgblur' />
                    }
                </div>
            }
        </div>
    );
}

export default PostImg;