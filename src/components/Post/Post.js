import { Link } from 'react-router-dom';
import { useState } from 'react';

import PostImg from './PostImg';
import 'css/Post/Post.css';
import { userIcon } from 'helpers/importIcons';

import usePostEvents from 'hooks/events/usePostEvents';
import { useAuthContext } from 'hooks/context/useAuthContext';
import { iconPath } from 'helpers/Path';
import { timeDiff } from 'helpers/time';
import { HideScroll } from 'helpers/HandleScroll';
import { PreLoad } from 'helpers/PreLoad';
import UserLink from 'components/User/UserLink';
PreLoad();

const Post = ({ post: data }) => {
    const { user: I } = useAuthContext();
    const [post, setPost] = useState(data);
    const [postMore, setPostMore] = useState(false);
    
    const { handleLikes, handleShare, handleSave, handleDelete, isError } = usePostEvents({ setPost });
    console.log(data);
    
    return (
        <div className="post" id={post._id} key={post._id}>
            <div className="post-meta post-meta-head">
                <div className="post-user">
                    <div className="post-user-img post-meta-icons-div">
                        <img src={userIcon} alt="user" className='icons' />
                    </div>
                    <div><UserLink Username={post.Username} /></div>
                </div>
                <div className="post-meta-icons-div no-margin-right" onClick={(e) => {
                    HideScroll(true);
                    setPostMore(true);
                }}>
                    <img src={iconPath + 'more.png'} alt="more" className='icons' />
                </div>
            </div>

            <PostImg post={post} setPost={setPost} handleLikes={handleLikes} />
            {isError && <div className='err-msg' style={{ minHeight: '100px' }}>{isError}</div>}
            <div className="post-meta post-meta-bottom">
                <div className="post-meta-bottom-1">

                    <div className="post-meta-bottom-1-1">
                        <div className="post-meta-icons-div" onClick={(e) => handleLikes(e, post)}>
                            {post.iLiked ?
                                <img src={iconPath + 'liked.png'} alt="Like" />
                                : <img src={iconPath + 'like.png'} alt="Like" className='icons' />
                            }
                        </div>
                        <Link to={'/comments/' + post.commentId}>
                            <div className="post-meta-icons-div comment">
                                <img src={iconPath + 'comment.png'} alt="Comment" className='icons' />
                            </div>
                        </Link>
                        <div className="post-meta-icons-div" onClick={e => handleShare(e, post)}>
                            <img src={iconPath + 'share.png'} alt="Share" className='icons' />
                        </div>
                    </div>

                    <div>
                        <div className="post-meta-icons-div no-margin-right" onClick={e => handleSave(e, post)}>
                            <img src={iconPath + (post.iSaved ? 'saved' : 'save') + '.png'} alt="Save" className='icons' />
                        </div>
                    </div>
                </div>
                <div className="post-meta-bottom-2">
                    <div><span className="noOfLikes" >{post.likes}</span> likes</div>
                    <div><UserLink Username={post.Username} />  {post.quote}</div>
                    <div className='time'>{timeDiff(post.createdAt)}</div>
                </div>
            </div>
            {postMore &&
                <div className="PostMore">
                    <div className="list">
                        {I.Username === post.Username &&
                            <div onClick={(e) => {
                                handleDelete(e, post._id);
                                setPostMore(false);
                                HideScroll(false);
                            }}>Delete this post</div>
                        }
                        <div onClick={() => alert('this feature is not working now...')}>Report</div>
                        <div onClick={() => {
                            setPostMore(false);
                            HideScroll(false);
                        }}>Cancel</div>
                    </div>
                </div>
            }
        </div>
    );
}
export default Post;