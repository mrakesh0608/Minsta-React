import { useState } from "react";
import {Link} from 'react-router-dom';

import PostGrid from 'components/Post/PostGrid';

import {iconPath} from 'helpers/Path'

const UserPostTag = ({userId}) => {

    const [PostTag, setPostTag] = useState('Post');

    return (
        <div>
            <div id='user-posts-tags' className='user-posts-tags'>
                <button className={
                    PostTag === 'Post' ? 'btn-active' : 'btn-not-active'}
                    onClick={() => setPostTag('Post')}
                >
                    <img src={iconPath+ 'grid.png'} alt="grid" className='icons' />
                    <span>Posts</span>
                </button>
                <button className={
                    PostTag === 'Tag' ? 'btn-active' : 'btn-not-active'}
                    onClick={() => setPostTag('Tag')}
                >
                    <img src={iconPath+ 'tag.png'} alt="tag" className='icons' />
                    <span>Tags</span>
                </button>
            </div>
            {PostTag === 'Post' && <PostGrid pathname={'/posts?userId='+userId+'&'} />}
            {PostTag === 'Tag' &&
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h2>Tags</h2>
                    <p><Link to='login' style={{ color: 'blue' }}>Login</Link></p>
                    <p>or</p>
                    <p><Link to='signup' style={{ color: 'blue' }}>Sign Up</Link></p>
                </div>
            }
        </div>
    );
}

export default UserPostTag;