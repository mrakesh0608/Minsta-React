import { iconPath } from './Path';
//Like Start
const handleLikes = (e, post, setPost) => {
    if (post.liked_users.includes("rakesh")) {
        ani_Like(e, false);
        post.liked_users = post.liked_users.filter(user => "rakesh" !== user)
        post.likes = post.likes - 1;
    }
    else {
        ani_Like(e, true);
        post.likes = post.likes + 1;
        post.liked_users.push("rakesh");
    }
    // console.log(post);
    setPost({ ...post });
    update_Post_In_Server(post);
}

//Like Animation Start
const ani_Like = (e, flag) => {

    const post = e.target.closest('.post');
    //remove all animated gifs if exists
    clear_ani_on_post(post);

    let time;
    if (flag) {
        post.querySelector('.post-content').innerHTML += '<img src="' + iconPath + 'ani_liked.gif" alt="like heart" class="ani-like">';
        time = 850;
    }
    else {
        post.querySelector('.post-content').innerHTML += '<img src="' + iconPath + 'ani_unliked.gif" alt="like heart" class="ani-like">'
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
        const post = e.target.closest('.post');
        const postContent = post.querySelector('.post-content');

        const response = await fetch(postContent.querySelector('img').src);
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
const handleSave = (e, post, setPost) => {
    if (post.saved_users.includes(post.username)) {
        post.saved_users = post.saved_users.filter(username => post.username !== username)
    }
    else post.saved_users.push(post.username);

    setPost({ ...post });
    update_Post_In_Server(post);
}
//Save Post -End
const update_Post_In_Server = (post) => {

    fetch( 'posts/' + post._id, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)

    }).then(res => {
        if (res.ok) console.log('post updated')
        // else console.log(res);
    })
}
export { handleLikes, handleShare, handleSave };