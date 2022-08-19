import { Link } from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import { useRef, useEffect } from 'react';

import { folderPicsIcon } from 'helpers/importsIcons';
import eventHoldWait from 'helpers/eventHoldWait';

const PostGridImg = ({ post, showPost }) => {

    const ref = useRef(null);
    const { fetchData, data: image, isError, isPending } = useFetch();

    useEffect(() => {
        fetchData({ path: '/post-img/grid/' + post.imgId, method: "GET" });

        eventHoldWait(ref.current, showPost)
    }, [])

    return (
        <div className="Post-Grid-container-content" ref={ref}>
            {image ?
                <Link to={'/posts/' + post._id}>
                    {image.imgDataLength > 1 &&
                        <div className='grid-folderPics'>
                            <img src={folderPicsIcon} alt="multiple" />
                        </div>
                    }
                    <img src={image.imgData.toString('base64')}
                        alt={post.img_name}
                    />
                </Link> :
                (isError ? <div className='img-load'>{isError}</div> :
                    (isPending && <div className='img-load '>Fetching <br /> Image ...</div>)
                )
            }
        </div>
    );
}
export default PostGridImg;