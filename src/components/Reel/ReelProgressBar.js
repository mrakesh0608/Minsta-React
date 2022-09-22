import 'css/Reel/ReelProgressBar.css';
import { useEffect } from 'react';
const ReelProgressBar = ({ currentPlayingVideo }) => {
    useEffect(() => {
        currentPlayingVideo?.addEventListener('timeupdate', (e) => {
            if (document.getElementById('bar')) {
                const val = (e.target.currentTime / e.target.duration) * document.getElementById('bar').offsetWidth;
                document.documentElement.style.setProperty('--progress', `${val}px`);
            }
        })
        return function exit() {
            currentPlayingVideo?.removeEventListener('timeupdate', (e) => {
                console.log(e.target.currentTime, e.target.duration, document.getElementById('bar').offsetWidth);
            })
        }
    }, [currentPlayingVideo]);

    const handleSeek = (e) => {
        currentPlayingVideo.currentTime = (e.clientX / document.getElementById('bar').offsetWidth) * currentPlayingVideo.duration;
    }

    if (currentPlayingVideo) {
        return (
            <div id="bar" onClick={handleSeek}>
                <div id='progress'></div>
            </div>
        );
    }
}
export default ReelProgressBar;