import { useRef,useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';

import { usePostImgContext } from 'hooks/usePostImgContext';

const PostImg = ({ post, setPost, handleLikes }) => {

    const { postImgs, dispatch } = usePostImgContext();

    const { fetchData, data: image, setData: setImg, isError, isPending } = useFetch();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const ref = useRef(null);
    
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

        for (const type of ['mouseup', 'mouseleave', 'mouseout', 'touchend', 'touchcancel']) {
            document.getElementById(`pcl-${post._id}`).addEventListener(type,()=>{
                setTimeout(()=>{
                    scrollEndFun(ref.current);
                },300)
            })
        }
    }, [])
    
    const scrollEndFun = (target) => {
        let need = window.screen.width - (target.scrollLeft % window.screen.width);
        if (need !== window.screen.width) {
            if (need < window.screen.width / 2)
                target.scrollLeft = target.scrollLeft + need;
            else
                target.scrollLeft = (target.scrollLeft + need) - window.screen.width;
        }
    }

    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    
    const setCurrentImg = (index) => {
        document.getElementById(`${post._id}-${currentImgIndex}`).style.backgroundColor = 'lightblue';
        
        document.getElementById(`${post._id}-${index}`).style.backgroundColor = 'blue';
        document.getElementById(`${post._id}-${index}`).style.opacity = 1;
        console.log(index);
        setCurrentImgIndex(index);
    }

    let timer = null;
    const scrollListen = (e) => {
        setCurrentImg(parseInt(e.target.scrollLeft / window.screen.width));

        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {scrollEndFun(e.target)}, 600);
    }

    return (
        <div>
            <div className='post-content-img-container'>
                <div id={`pcl-${post._id}`}
                    className='post-content-list'
                    onDoubleClick={(e) => handleLikes(e, post, setPost)}
                    onScroll={(e) => scrollListen(e)}
                    ref={ref}
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
            {post.imgDataLength > 1 &&
                <div className='mul-posts'>
                    {image && image.imgData.map((img, key) =>
                        <div id={`${post._id}-${key}`} key={key} ></div>
                    )}
                </div>
            }
        </div>
    );
}
export default PostImg;