import UserImgNameFollow from 'components/User/UserImgNameFollow';
import { shareIcon, likeIcon, likedIcon, commentIcon, moreIcon, waveIcon} from 'helpers/importsIcons';
import { useState } from 'react';
import useReelEvents from 'hooks/useReelEvents';
import { PreLoad } from 'helpers/PreLoad';
PreLoad();
const Reel = ({ reel: data, setCurrentPlayingVideo }) => {

    const [reel, setReel] = useState(data);
    const [reelMore, setReelMore] = useState(false);

    const { handleLikes, handleShare, handleSave, isError } = useReelEvents({ setReel });

    const handleReel = (video) => {
        if (video.paused) {
            video.play();
            setCurrentPlayingVideo(video);
        }
        else video.pause();
    }
    return (
        <div className="reel" id={reel._id}>
            <div className="videoHeader">
                <h3>Reels</h3>
            </div>
            <video src={reel.reelData} loop onClick={(e) => handleReel(e.target)} />
            <div className="videoFooter">
                <div className='leftFooter'>
                    <UserImgNameFollow UserName={reel.UserName} />
                    <p>{reel.quote}</p>
                    <div className='music'>
                        <img src={waveIcon} alt="" />
                        <span>{reel.musicName}</span>
                    </div>
                </div>
                <div className='rightFooter'>
                    <div>
                        <img className='reelIcons'src={reel.iLiked ? likedIcon : likeIcon} alt="like" onClick={(e) => handleLikes(e, reel)} />
                        <span>{reel.likes}</span>
                    </div>
                    <div>
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

export default Reel;