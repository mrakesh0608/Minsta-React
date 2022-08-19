import { useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';

import { usePostImgContext } from 'hooks/usePostImgContext';

const PostImg = ({ post, setPost, handleLikes }) => {

    const { postImgs, dispatch } = usePostImgContext();

    const { fetchData, data: image, setData: setImg, isError, isPending } = useFetch();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const img = postImgs.find(img => img._id === post.imgId);
        if (img) {
            setImg(img);
            return;
        }
        fetchData({
            path: '/post-img/' + post.imgId,
            method: "GET"
        }).then(res => {
            dispatch({ type: 'ADD_POST_IMG', payload: res })
        })
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, [])

    let timer = null;
    const scrollListen = (e) => {
        if (timer !== null) {
            clearTimeout(timer);
            // console.log('time cleared');
        }
        timer = setTimeout(() => {
            let need = window.screen.width - (e.target.scrollLeft % window.screen.width);
            if (need !== window.screen.width) {
                if (need < window.screen.width / 2)
                    e.target.scrollLeft = e.target.scrollLeft + need;
                else
                    e.target.scrollLeft = (e.target.scrollLeft + need) - window.screen.width;
            }
        }, 400);
    }

    return (
        <div className='post-content-img-container'>
            <div className='post-content-list'
                onDoubleClick={(e) => handleLikes(e, post, setPost)}
                onScroll={(e) => scrollListen(e)}
            >
                {
                    image ?
                        image.imgData.map((img, key) =>
                            <div key={key}
                                className={'post-content' + (image.imgData.length > 1 ? ' multiple' : '')}
                            >
                                <div className='img-div' >
                                    <img src={img.toString('base64')} alt={post.imgName} className='post-content-img' />

                                    {windowWidth > 600 &&
                                        <img src={img.toString('base64')} alt={post.imgName} className='bgImgblur' />
                                    }
                                </div>
                            </div>
                        ) :
                        (isError ?
                            <div className='img-load'>{isError}</div> :
                            (isPending && <div className='img-load'>Fetching Image ...</div>)
                        )
                }
            </div >
            {/* Ani Like Comes Here */}
        </div>
    );
}
export default PostImg;