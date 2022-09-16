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
const hideBottomInReel = (e) => {
    if (pre_ScrollY > e.target.scrollTop) {
        document.documentElement.style.setProperty('--bottomDivH', '30px');
        document.getElementById('bottom').style.visibility = 'visible';
        pre_ScrollY = e.target.scrollTop + 5;
    }
    else {
        document.documentElement.style.setProperty('--bottomDivH', '0px');
        document.getElementById('bottom').style.visibility = 'hidden';
        pre_ScrollY = e.target.scrollTop - 5;
    }
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
const isElementEnd = (ele) => {
    //-250 to load before end
    if ((window.innerHeight + window.scrollY) >= (ele.offsetHeight - window.innerHeight))
        return true;
    else return false;
}

const EleScrollLoad = (setIsScrollLoad,query) => {
    const ScrollListen = (listen) => {
        const ele = document.querySelector(query);
        console.log(query,ele);
        if (ele) {
            if (listen)
                ele.addEventListener('scroll', () => setIsScrollLoad(isPageEnd(ele)));
            else ele.addEventListener('scroll', () => setIsScrollLoad(false));
        }
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
export { HandleScroll, ScrollLoad, HideScroll, hideBottomInReel, isElementEnd, EleScrollLoad };