import { useNavigate } from 'react-router-dom';
import { iconPath } from 'helpers/Path';
import { useAuthContext } from 'hooks/useAuthContext';
import useFetch from 'hooks/useFetch';

const useReelEvents = ({ setReel }) => {
    const { user } = useAuthContext();

    const { fetchData, isError } = useFetch();
    const navigate = useNavigate();
    //Like Start
    const handleLikes = (e, reel) => {
        if (reel.iLiked) {
            // ani_Like(e, false);
            reel.likes = reel.likes - 1;
        }
        else {
            // ani_Like(e, true);
            reel.likes = reel.likes + 1;
        }
        reel.iLiked = !reel.iLiked;
        // console.log(reel);
        setReel({ ...reel });
        update_reel_In_Server({
            "_id": reel._id,
            "updateAttr": "liked_users",
            "username": user.Username,
            "updateAdd": reel.iLiked
        });
    }

    //Like Animation Start
    const ani_Like = (e, flag) => {

        const reel = e.target.closest('.reel');
        //remove all animated gifs if exists
        clear_ani_on_reel(reel);

        let time;
        if (flag) {
            reel.querySelector('.animation-like').innerHTML = '<img src="' + iconPath + 'ani_liked.gif" alt="like heart" class="ani-like">';
            time = 850;
        }
        else {
            reel.querySelector('.animation-like').innerHTML = '<img src="' + iconPath + 'ani_unliked.gif" alt="like heart" class="ani-like">'
            time = 800;
        }

        //Remove all animated gifs after specific time
        setTimeout(() => { clear_ani_on_reel(reel) }, time);
    }
    function clear_ani_on_reel(reel) {
        const repeat_ani = reel.querySelectorAll('.ani-like');
        Array.from(repeat_ani).forEach(reel => {
            reel.remove();
        });
    }
    //Like Animation End
    //Like End

    //Share - Start
    const handleShare = async (e, reel) => {
        try {
            const src = e.target.closest('.reel').querySelector('video').src;

            const response = await fetch(src);
            const blob = await response.blob();
            console.log(response);
            const filesArray = [
                new File(
                    [blob],
                    'reel.mp4',
                    {
                        type: blob.type,
                        lastModified: new Date().getTime()
                    }
                )
            ];
            console.log(reel);
            const shareData = {
                files: filesArray,
                title: `Reel From ${reel.UserName}`,
                text : reel.quote,
                url:'https://minsta-react.herokuapp.com/reel'
            };
            await navigator.share(shareData);
            alert('reel shared Successfully');
        }
        catch (err) {alert('Error Occured\n\n' + err);}
    }
    //Share -End

    //Save reel - Start
    const handleSave = (e, reel) => {
        reel.iSaved = !reel.iSaved;
        setReel({ ...reel });
        update_reel_In_Server({
            "_id": reel._id,
            "updateAttr": "saved_users",
            "username": user.Username,
            "updateAdd": reel.iSaved
        });
    }
    //Save reel -End
    const update_reel_In_Server = (payload) => {

        // fetchData({
        //     path: '/reel/' + payload._id,
        //     method: 'PATCH',
        //     payload
        // }).then(res => {
        //     if (res) {
        //         console.log('reel updated')
        //         setReel(res);
        //     }
        //     else console.log(res);
        // })
    }

    return { handleLikes, handleShare, handleSave, isError };
}
export default useReelEvents;