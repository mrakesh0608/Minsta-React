import { useNavigate } from 'react-router-dom';
import { iconPath } from 'helpers/Path';
import { useAuthContext } from 'hooks/useAuthContext';
import useFetch from 'hooks/useFetch';

const usePostEvents = ({ setReel }) => {
    const { user } = useAuthContext();

    const { fetchData, isError } = useFetch();
    const navigate = useNavigate();
    //Like Start
    const handleLikes = (e, post) => {
        if (post.iLiked) {
            // ani_Like(e, false);
            post.likes = post.likes - 1;
        }
        else {
            // ani_Like(e, true);
            post.likes = post.likes + 1;
        }
        post.iLiked = !post.iLiked;
        // console.log(post);
        setReel({ ...post });
        update_Post_In_Server({
            "_id": post._id,
            "updateAttr": "liked_users",
            "username": user.Username,
            "updateAdd": post.iLiked
        });
    }

    //Like Animation Start
    const ani_Like = (e, flag) => {

        const post = e.target.closest('.post');
        //remove all animated gifs if exists
        clear_ani_on_post(post);

        let time;
        if (flag) {
            post.querySelector('.animation-like').innerHTML = '<img src="' + iconPath + 'ani_liked.gif" alt="like heart" class="ani-like">';
            time = 850;
        }
        else {
            post.querySelector('.animation-like').innerHTML = '<img src="' + iconPath + 'ani_unliked.gif" alt="like heart" class="ani-like">'
            time = 800;
        }

        //Remove all animated gifs after specific time
        setTimeout(() => { clear_ani_on_post(post) }, time);
    }
    function clear_ani_on_post(post) {
        const repeat_ani = post.querySelectorAll('.ani-like');
        Array.from(repeat_ani).forEach(post => {
            post.remove();
        });
    }
    //Like Animation End
    //Like End

    //Share - Start
    const handleShare = async (e, post) => {
        try {
            const post = e.target.closest('.reel');
            const postContent = post.querySelector('video');

            const response = await fetch(postContent.src);
            const blob = await response.blob();

            const filesArray = [
                new File(
                    [blob],
                    'image.jpg',
                    {
                        type: "image/jpeg",
                        lastModified: new Date().getTime()
                    }
                )
            ];
            const shareData = { files: filesArray };

            await navigator.share(shareData);
            alert('post shared Successfully');
        }
        catch (err) {
            alert('Error Occured\n\n' + err);
        }
    }
    //Share -End

    //Save Post - Start
    const handleSave = (e, post) => {
        post.iSaved = !post.iSaved;
        setReel({ ...post });
        update_Post_In_Server({
            "_id": post._id,
            "updateAttr": "saved_users",
            "username": user.Username,
            "updateAdd": post.iSaved
        });
    }
    //Save Post -End
    const update_Post_In_Server = (payload) => {

        // fetchData({
        //     path: '/posts/' + payload._id,
        //     method: 'PATCH',
        //     payload
        // }).then(res => {
        //     if (res) {
        //         console.log('post updated')
        //         setReel(res);
        //     }
        //     else console.log(res);
        // })
    }

    return { handleLikes, handleShare, handleSave, isError };
}
export default usePostEvents;