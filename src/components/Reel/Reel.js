import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReelContext } from 'hooks/context/useReelContext';
import useReelEvents from 'hooks/events/useReelEvents';

import UserImgNameFollow from 'components/User/UserImgNameFollow';

import { shareIcon, likeIcon, likedIcon, commentIcon, moreIcon, waveIcon, playIcon } from 'helpers/importIcons';
import { PreLoad } from 'helpers/PreLoad';

PreLoad();

export default ({ reel: data, setCurrentPlayingVideo }) => {
    const { lastViewed } = useReelContext();
    const navigate = useNavigate();
    const [reel, setReel] = useState(data);
    const { handleLikes, handleShare } = useReelEvents({ setReel });

    const handleReel = (video) => {
        if (video.paused) {
            video.play();
            setCurrentPlayingVideo(video);
        }
        else video.pause();
    }

    useEffect(() => {
        const video = document.getElementById(reel._id).querySelector('video');
        video.addEventListener('pause', () => {
            document.getElementById(reel._id).querySelector('.pause').style.display = 'block';
        })
        video.addEventListener('play', () => {
            document.getElementById(reel._id).querySelector('.pause').style.display = 'none';
        })
        if (reel._id === lastViewed) {
            document.getElementById(lastViewed).scrollIntoView();
        }
        return () => {
            video.removeEventListener('pause', () => { });
            video.removeEventListener('play', () => { });
        }
    }, [])
    return (
        <div className="reel" id={reel._id} onDoubleClick={(e) => handleLikes(e, reel)}>
            <div className="videoHeader">
                <h3>Reels</h3>
            </div>
            <video src={reel.reelData} loop onClick={(e) => handleReel(e.target)} />
            <button className="pause"
                onClick={(e) => handleReel(document.getElementById(reel._id).querySelector('video'))}>
                <img src={playIcon} alt="pause" />
            </button>
            <div className="videoFooter">
                <div className='leftFooter'>
                    <UserImgNameFollow Username={reel.Username} userId={reel.userId} />
                    <p>{reel.quote}</p>
                    {reel.musicName &&
                        <div className='music'>
                            <img src={waveIcon} alt="" />
                            <span>{reel.musicName}</span>
                        </div>
                    }
                </div>
                <div className='rightFooter'>
                    <div>
                        <img className={`reelIcons ${reel.iLiked ? 'notInvertIcons' : ''}`} src={reel.iLiked ? likedIcon : likeIcon} alt="like" onClick={(e) => handleLikes(e, reel)} />
                        <span>{reel.likes}</span>
                    </div>
                    <div onClick={() => navigate(`/comments/${reel.commentId}`)}>
                        <img className='reelIcons' src={commentIcon} alt="comment" />
                        <span>{reel.comments}</span>
                    </div>
                    <div >
                        <img className='reelIcons' src={shareIcon} alt="share" onClick={e => handleShare(e, reel)} />
                    </div>
                    <div>
                        <img className='reelIcons' src={moreIcon} alt="more" />
                    </div>
                </div>
            </div>
            <div className="animation-like"></div>
        </div>
    );
}