import { Link } from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';

const PostGridImg = ({ post, handlePointerDown, HideScroll }) => {

    const { fetchData, data: image, isError, isPending } = useFetch();

    useEffect(() => {
        fetchData({ path: '/post-img/' + post.imgId, method: "GET" });
    }, [])

    return (
        <div className="Post-Grid-container-content" onPointerDown={handlePointerDown}>
            {image ?
                <Link to={'/posts/' + post._id}>
                    {image.imgData.length > 1 &&
                        <div className='grid-folderPics'>
                            <img src='/icons/folderPics.png' alt="addNew" />
                        </div>
                    }
                    <img src={image.imgData[0].toString('base64')}
                        alt={post.img_name}
                        onClick={() => HideScroll(false)}
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