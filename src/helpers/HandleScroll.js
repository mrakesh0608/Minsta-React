//Scroll Event - Start
let pre_ScrollY = window.scrollY - 5;

const HandleScroll = () => {
    const hideOnScroll = document.getElementsByClassName('hideOnScroll');
    // console.log(hideOnScroll);

    document.addEventListener('scroll', () => {
        // console.log('scroll');
        if (pre_ScrollY > window.scrollY) {

            Array.from(hideOnScroll).forEach( div => {
                document.getElementById(div.id).style.visibility = 'visible';
            });
            pre_ScrollY = window.scrollY + 5;
        }
        else {
            Array.from(hideOnScroll).forEach( div => {
                document.getElementById(div.id).style.visibility = 'hidden';
            });
            pre_ScrollY = window.scrollY - 5;
        }
    })
}

const isPageEnd = ()=>{
    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 250))
        return true;
    else return false;
}

const ScrollLoad = (setIsScrollLoad) => {

    document.addEventListener('scroll', () => setIsScrollLoad(isPageEnd()));
}
const HideScroll = (flag)=>{
    if(flag){
        document.querySelector('body').style.overflow = 'hidden';
    }
    else{
        document.querySelector('body').style.overflow = 'auto';
    }
    
}
//Scroll Event - End
export { HandleScroll, ScrollLoad,HideScroll};