//Scroll Event - Start
let pre_ScrollY = window.scrollY - 5;

const HandleScroll = () => {
    const hideOnScroll = document.getElementsByClassName('hideOnScroll');
    // console.log(hideOnScroll);

    document.addEventListener('scroll', () => {
        // console.log('scroll');
        if (pre_ScrollY > window.scrollY) {

            Array.from(hideOnScroll).forEach(div => {
                document.getElementById(div.id).style.visibility = 'visible';
            });
            pre_ScrollY = window.scrollY + 5;
        }
        else {
            Array.from(hideOnScroll).forEach(div => {
                document.getElementById(div.id).style.visibility = 'hidden';
            });
            pre_ScrollY = window.scrollY - 5;
        }
    })
}

const isPageEnd = () => {
    //-250 to load before end
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 250))
        return true;
    else return false;
}

const ScrollLoad = (setIsScrollLoad) => {
    
    const ScrollListen = (listen) => {
        if (listen)
            document.addEventListener('scroll', () => setIsScrollLoad(isPageEnd()));
        else document.addEventListener('scroll', () => setIsScrollLoad(false));
        // console.log(listen);
    };
    return { ScrollListen };
}
const HideScroll = (flag) => {
    if (flag) {
        document.querySelector('body').style.overflow = 'hidden';
    }
    else {
        document.querySelector('body').style.overflow = 'auto';
    }

}
//Scroll Event - End
export { HandleScroll, ScrollLoad, HideScroll };