import { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import { EleScrollLoad } from 'helpers/HandleScroll';
import Reel from 'components/Reel/Reel';
import ReelProgressBar from 'components/Reel/ReelProgressBar';
import { useReelContext } from 'hooks/context/useReelContext'

import 'css/Reel/Reels.css';
let initReels;
const Reels = () => {

    const { reels, page, noMoreReels, dispatch } = useReelContext();

    const limit = 1;
    const { fetchData, isError, isPending } = useFetch();

    const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);

    const [isScrollLoad, setIsScrollLoad] = useState(false);
    const { ScrollListen } = EleScrollLoad(setIsScrollLoad, '#reel-list');

    const initialize = () => {
        console.log('initialized');
        dispatch({ type: 'REFRESH' })
        ScrollListen(true);
        LoadMore();
    }

    useEffect(() => {
        initReels = initialize;
        if (reels.length === 0) LoadMore();
    }, [])
    useEffect(() => {
        return () => {
            if (currentPlayingVideo) {
                dispatch({
                    type: 'SET_LAST_VIEWED',
                    payload: currentPlayingVideo.closest('.reel').id
                });
            }
        }
    }, [currentPlayingVideo])
    const LoadMore = async () => {
        ScrollListen(false);
        fetchData({
            path: '/reel?' + new URLSearchParams({ skip: page * limit, limit: limit }), method: "GET"
        }).then(res => {
            if (res) {
                if (res.length > 0) {
                    dispatch({ type: 'ADD_REELS', payload: [...res] });
                }
                if (res.length === 0 || res.length < limit) {
                    dispatch({ type: 'SET_NO_MORE_REELS' });
                    return;
                }
                ScrollListen(true);
            }
        })
    }
    const openFullscreen = () => {
        const element = document.getElementById('reel-list');
        if (element.requestFullscreen) element.requestFullscreen();
    }
    return (
        <div id="Reels">
            {reels.length === 0 ?
                (isError ?
                    <div className='err-msg'>{isError}</div> :
                    (isPending ?
                        <div className='loading'><h3>Fetching Reels ...</h3></div> :
                        <div className='loading'><h3>No Reels</h3></div>
                    )
                ) :
                <div id="Reels-content">
                    <div id='fullScreen'>
                        <p>for Better Experience, <span onClick={() => openFullscreen()}>open</span> Full Screen mode .</p>
                        <div onClick={(e) => { e.target.closest('#fullScreen').remove() }}>X</div>
                    </div>
                    <div id='reel-list'>
                        {reels.map(reel =>
                            <Reel key={reel._id} reel={reel} setCurrentPlayingVideo={setCurrentPlayingVideo} />
                        )}
                        <ReelProgressBar currentPlayingVideo={currentPlayingVideo} />
                        {!isPending && (noMoreReels ?
                            <div className='end-of-reels'><h2>End of Reels</h2></div> :
                            ((isScrollLoad || reels.length < 2) && LoadMore())
                        )}
                        {isError ?
                            <div className='end-of-reels error'>{isError}</div> :
                            (isPending && <div className='reel load-more'><h3>Fetching More Reels ...</h3></div>)}
                    </div>
                </div>
            }
        </div >
    );
}
export { Reels, initReels };