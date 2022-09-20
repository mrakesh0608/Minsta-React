let lastUsername = null;
let lastDay = null;

const updateLet = (Username, day) => {
    lastUsername = Username;
    lastDay = day
}
const GetTriangle = ({ pos, Username, day }) => {
    // console.log(lastUsername, Username,lastDay,day);
    if (lastUsername === Username && lastDay === day) {
        updateLet(Username, day);
        return <div className='triangle triangle-empty'></div>
    }
    updateLet(Username, day);

    if (pos === 'left') return <div className='triangle triangle-left' />
    else return <div className='triangle triangle-right' />
}
export { GetTriangle };