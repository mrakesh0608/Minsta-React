import { Link } from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';

const PostGridImg = ({ post, handlePointerDown }) => {

    const {fetchData,data: image,isError,isPending} = useFetch();

    useEffect(()=>{
        fetchData({path:'/post-img/' + post.imgId,method:"GET"});
    },[])

    return (
        <div className="Post-Grid-container-content" onPointerDown={handlePointerDown}>
            {isError && <div className='img-load'>{isError}</div>}
            {isPending && <div className='img-load '>Fetching <br /> Image ...</div>}
            {image &&
                <Link to={'/posts/' + post._id}>
                    <img src={image.imgData.toString('base64')} alt={post.img_name} />
                </Link>
            }
        </div>
    );
}
export default PostGridImg;