import { useNavigate } from 'react-router-dom';

import { usePostListContext } from 'hooks/context/usePostListContext';
import { useAuthContext } from 'hooks/context/useAuthContext';

import useFetch from 'hooks/useFetch';

import { iconPath } from 'helpers/Path';

const usePostEvents = ({ setPost }) => {
    const { user } = useAuthContext();
    const { dispatch } = usePostListContext();

    const { fetchData, isError } = useFetch();
    const navigate = useNavigate();
    //Like Start
    const handleLikes = (e, post) => {
        if (post.iLiked) {
            ani_Like(e, false);
            post.likes = post.likes - 1;
        }
        else {
            ani_Like(e, true);
            post.likes = post.likes + 1;
        }
        post.iLiked = !post.iLiked;
        // console.log(post);
        setPost({ ...post });
        update_Post_In_Server({
            "_id": post._id,
            "updateAttr": "liked_users",
            "Username": user.Username,
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
            const res = await fetch(e.target.closest('.post').querySelector('.post-content').querySelector('img').src);
            const blob = await res.blob();

            await navigator.share({
                files: [
                    new File(
                        [blob],
                        'image.jpg',
                        {
                            type: blob.type,
                            lastModified: new Date().getTime()
                        }
                    )
                ],
                title: `Post From ${post.Username}`,
                text: post.quote,
                url: `https://minsta.vercel.app/posts/${post._id}`
            });
            alert('post shared Successfully');
        }
        catch (err) {alert('Error Occured\n\n' + err);}
    }
    //Share -End

    //Save Post - Start
    const handleSave = (e, post) => {
        post.iSaved = !post.iSaved;
        setPost({ ...post });
        update_Post_In_Server({
            "_id": post._id,
            "updateAttr": "saved_users",
            "Username": user.Username,
            "updateAdd": post.iSaved
        });
    }
    //Save Post -End
    const update_Post_In_Server = (payload) => {

        fetchData({
            path: '/posts/' + payload._id,
            method: 'PATCH',
            payload
        }).then(res => {
            if (res) {
                console.log('post updated')
                setPost(res);
            }
            else console.log(res);
        })
    }

    //Delete Post
    const handleDelete = (e, id) => {
        const post = e.target.closest('.post');
        post.classList.add('disapear');

        fetchData({
            path: '/posts/' + id,
            method: 'DELETE'
        }).then(res => {
            if (res) {
                setTimeout(() => {
                    dispatch({ type: 'DELETE_POST', payload: res })
                    navigate('/');
                }, 1500);
                console.log('post deleted');
            } else {
                post.classList.remove('disapear');
            }
        })
    }
    return { handleLikes, handleShare, handleSave, handleDelete, isError };
}
export default usePostEvents;