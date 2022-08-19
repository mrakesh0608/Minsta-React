import { useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';

const PostImg = ({ post, setPost, handleLikes }) => {
    const { fetchData, data: image, isError, isPending } = useFetch();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        fetchData({ path: '/post-img/' + post.imgId, method: "GET" });
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
        }, 500);
    }

    return (
        <div className='post-content-list'
            onDoubleClick={(e) => handleLikes(e, post, setPost)}
            onScroll={(e)=>scrollListen(e)}
        >
            {
                image ?
                    image.imgData.map((img, key) =>
                        <div className="post-content" key={key}>
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
    );
}

export default PostImg;