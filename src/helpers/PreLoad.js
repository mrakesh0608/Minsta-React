import { iconPath } from './Path';

const PreLoad = () => {

    // const iconsPreload = ['home', 'home-on', 'explore', 'explore-on',
    //     'add-new', 'add-new-on', 'heart', 'heart-on',
    //     'user', 'user-on'];

    const gifPreload = ['ani_liked', 'ani_unliked'];
    const postIconsPreload = ['like', 'liked', 'comment', 'share', 'save', 'saved'];

    // preLoad(iconsPreload, '.png');
    preLoad(gifPreload, '.gif');
    preLoad(postIconsPreload, '.png');
}
const preLoad = (setOfImages, extension) => {
    
    setOfImages.forEach((image) => {
        const newImage = new Image();
        newImage.src = iconPath + image + extension;
        window[image] = newImage;
    });
}
export { PreLoad };