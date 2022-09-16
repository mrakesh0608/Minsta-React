import { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import { EleScrollLoad } from 'helpers/HandleScroll';
import Reel from 'components/common/Reel';
import 'css/Reels.css';
const Reels = () => {
    const [reels, setReels] = useState(null);
    const [noMoreReels, setNoMoreReels] = useState(false);
    const [page, setPage] = useState(0);
    const limit = 1;
    const { fetchData, isError, isPending } = useFetch();

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    const { ScrollListen } = EleScrollLoad(setIsScrollLoad,'#reel-list');

    useEffect(() => {
        LoadMore();
    }, [])
    const LoadMore = async () => {
        ScrollListen(false);
        fetchData({
            path: '/reel?' + new URLSearchParams({ skip: page * limit, limit: limit }), method: "GET"
        }).then(res => {
            if (res) {
                if (reels) setReels([...reels, ...res]);
                else setReels(res);
                if (res.length === 0 || res.length < limit) {
                    setNoMoreReels(true);
                    return;
                }
                setPage(page + 1);
                ScrollListen(true);
            }
        })
    }

    const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);
    const handleReelPause = () => currentPlayingVideo?.pause();
    const openFullscreen = () => {
        const element = document.getElementById('reel-list');
        if (element.requestFullscreen) element.requestFullscreen();
    }
    return (
        <div id="Reels">
            {reels ?
                (reels.length === 0 ? <div className='loading'><h3>No Reels</h3></div> :
                    <div id="Reels-content">
                        <div id='fullScreen'>
                            <p>for Better Experience, <span onClick={() => openFullscreen()}>open</span> Full Screen Mode .</p>
                            <div onClick={(e) => { e.target.closest('#fullScreen').remove() }}>X</div>
                        </div>
                        <div id="reel-list" onScroll={handleReelPause}>
                            {reels.map(reel =>
                                <Reel key={reel._id} reel={reel} setCurrentPlayingVideo={setCurrentPlayingVideo} />
                            )}
                            {!isPending && (noMoreReels ?
                                <div className='end-of-reels'><h2>End of Reels</h2></div> :
                                ((isScrollLoad || reels.length < 2) && LoadMore())
                            )}
                            {isPending && <div className='reel load-more'><h3>Fetching More Reels ...</h3></div>}
                        </div>
                    </div>
                ) : (isError ?
                    <div className='err-msg'>{isError}</div> :
                    (page === 0 && isPending && <div className='loading'><h3>Fetching Reels ...</h3></div>)
                )
            }
        </div>
    );
}
export default Reels;