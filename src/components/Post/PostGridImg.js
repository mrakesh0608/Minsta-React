import { Link } from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import { useRef, useEffect } from 'react';

import { folderPicsIcon } from 'helpers/importsIcons';
import eventHoldWait from 'helpers/eventHoldWait';

import { usePostImgContext } from 'hooks/usePostImgContext';

const PostGridImg = ({ post, showPost }) => {

    const { postImgs, dispatch } = usePostImgContext();
    const { fetchData, data: image, setData: setImg, isError, isPending } = useFetch();

    const ref = useRef(null);
    useEffect(() => {
        eventHoldWait(ref.current, showPost);

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
    }, [])

    return (
        <div className="Post-Grid-container-content" ref={ref}>
            {image ?
                <Link to={'/posts/' + post._id}>
                    {image.imgData.length > 1 &&
                        <div className='grid-folderPics'>
                            <img src={folderPicsIcon} alt="multiple" />
                        </div>
                    }
                    <img src={image.imgData[0].toString('base64')}
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