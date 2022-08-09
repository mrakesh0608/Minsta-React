import { Link } from 'react-router-dom';
import { useState } from 'react';

import { PostImg } from './PostImg';
import 'css/Post.css'

import { handleLikes, handleShare, handleSave } from 'helpers/HandlePostEvents';
import { iconPath } from 'helpers/Path';
import { timeDiff } from 'helpers/timeDiff';

import { PreLoad } from 'helpers/PreLoad';
PreLoad();

const Post = ({ post: data }) => {

    const [post, setPost] = useState(data);
    return (
        <div className="post" key={post._id}>
            <div className="post-meta post-meta-head">
                <div className="post-user">
                    <div className="post-user-img post-meta-icons-div">
                        <img src={iconPath + 'user.png'} alt="user" className='icons' />
                    </div>
                    <div><a href={"/user/" + post.username} className='username'>{post.username}</a></div>
                </div>
                <div className="post-meta-icons-div no-margin-right"><img src={iconPath + 'more.png'} alt="more" className='icons' /></div>
            </div>

            <PostImg post={post} setPost={setPost} />

            <div className="post-meta post-meta-bottom">
                <div className="post-meta-bottom-1">

                    <div className="post-meta-bottom-1-1">
                        <div className="post-meta-icons-div" onClick={(e) => handleLikes(e, post, setPost)}>
                            {post.liked_users.includes("rakesh") ?
                                <img src={iconPath + 'liked.png'} alt="Like" />
                                : <img src={iconPath + 'like.png'} alt="Like" className='icons' />
                            }
                        </div>
                        <Link to={'/post/' + post._id}>
                            <div className="post-meta-icons-div comment">
                                <img src={iconPath + 'comment.png'} alt="Comment" className='icons' />
                            </div>
                        </Link>
                        <div className="post-meta-icons-div" onClick={e => handleShare(e, post)}>
                            <img src={iconPath + 'share.png'} alt="Share" className='icons' />
                        </div>
                    </div>

                    <div>
                        <div className="post-meta-icons-div no-margin-right" onClick={e => handleSave(e, post, setPost)}>
                            <img src={iconPath + (post.saved_users.includes(post.username) ? 'saved' : 'save') + '.png'} alt="Save" className='icons' />
                        </div>
                    </div>
                </div>
                <div className="post-meta-bottom-2">
                    <div><span className="noOfLikes" >{post.likes}</span> likes</div>
                    <div><a href={"/user/" + post.username} className='username'>{post.username}</a>  {post.quote}</div>
                    <div className='time'>{timeDiff(post.createdAt)}</div>
                </div>
            </div>
        </div>
    );
}
export default Post;