const eventHoldWait = (target, callback) => {

    let isHeld = false;

    for (const type of ['mousedown', 'touchstart']) {
        target.addEventListener(type, (e) => {
            isHeld = true;
            activeHoldTimeout(e);
        });
    }

    for (const type of ['mouseup', 'mouseleave', 'mouseout', 'touchend', 'touchcancel']) {
        target.addEventListener(type, () => {
            isHeld = false;
            clearTimeout(activeHoldTimeout)
        });
    }

    const activeHoldTimeout = (e) => setTimeout(() => {
        if (isHeld) callback(e);
    }, 350)
}
export default eventHoldWait;