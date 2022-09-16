const eventHoldWait = (target, callback) => {

    let isHeld = false;

    const clearTimer = () => {
        isHeld = false;
        clearTimeout(activeHoldTimeout)
    }

    const activeHoldTimeout = (e) => setTimeout(() => {
        if (isHeld) callback(e);
    }, 400);

    for (const type of ['mousedown', 'touchstart']) {
        target.addEventListener(type, (e) => {
            isHeld = true;
            activeHoldTimeout(e);
        });
    }

    for (const type of ['mouseup', 'mouseleave', 'mouseout', 'touchend', 'touchcancel', 'scroll']) {
        target.addEventListener(type, clearTimer);
    }
    document.addEventListener('scroll', clearTimer);
}
export default eventHoldWait;