import 'css/ReelProgressBar.css';
import { useEffect } from 'react';
const ReelProgressBar = ({ reel }) => {
    useEffect(() => {
        reel?.addEventListener('timeupdate', (e) => {
            const val = (e.target.currentTime / e.target.duration) * document.getElementById('bar').offsetWidth;
            document.documentElement.style.setProperty('--progress', `${val}px`);
        })
        // return function exit(){
        //     reel?.removeEventListener('timeupdate',(e)=>{
        //         console.log(e.target.currentTime,e.target.duration,document.getElementById('bar').offsetWidth);
        //     })
        // }
    }, [reel]);
    if (reel) {

        return (
            <div id="bar">
                <div id='progress'></div>
            </div>
        );
    }
}

export default ReelProgressBar;