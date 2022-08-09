import { Link } from 'react-router-dom';

import {REST_API_Async} from 'helpers/REST_API';

const PostGridImg = ({ post, handlePointerDown }) => {
    const { data: image, isPending, isError } = REST_API_Async({path:'/post-img/' + post.post_image_id,method:"GET"});

    return (
        <div className="Post-Grid-container-content" onPointerDown={handlePointerDown}>
            {isError && <div className='img-load'>{isError}</div>}
            {isPending && <div className='img-load '>Fetching <br /> Image ...</div>}
            {image &&
                <Link to={'/post/' + post._id}>
                    <img src={image.imgData.toString('base64')} alt={post.img_name} />
                </Link>
            }
        </div>
    );
}
export default PostGridImg;