import UserImgNameFollow from 'components/User/UserImgNameFollow';
import { shareIcon, likeIcon, likedIcon, commentIcon, moreIcon, waveIcon } from 'helpers/importIcons';
import { useState, useEffect, useRef } from 'react';
import useReelEvents from 'hooks/events/useReelEvents';
import { PreLoad } from 'helpers/PreLoad';
PreLoad();
const Reel = ({ reel: data, setCurrentPlayingVideo }) => {

    const [reel, setReel] = useState(data);
    const ref = useRef();
    const { handleLikes, handleShare } = useReelEvents({ setReel });

    const handleReel = (video) => {
        if (video.paused) {
            video.play();
            setCurrentPlayingVideo(video);
        }
        else video.pause();
    }
    
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const reel = entry.target.querySelector('video')
                if (entry.isIntersecting) reel.play();
                else reel.pause();
                setCurrentPlayingVideo(reel);
            })
        },{
            root: null,
            threshold: 1.0
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref.current])
    
    return (
        <div className="reel" id={reel._id} onDoubleClick={(e) => handleLikes(e, reel)} ref={ref}>
            <div className="videoHeader">
                <h3>Reels</h3>
            </div>
            <video src={reel.reelData} loop onClick={(e) => handleReel(e.target)} />
            <div className="videoFooter">
                <div className='leftFooter'>
                    <UserImgNameFollow UserName={reel.UserName} />
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