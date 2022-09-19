let lastUserName = null;
let lastDay = null;

const updateLet = (UserName, day) => {
    lastUserName = UserName;
    lastDay = day
}
const GetTriangle = ({ pos, UserName, day }) => {
    // console.log(lastUserName, UserName,lastDay,day);
    if (lastUserName === UserName && lastDay === day) {
        updateLet(UserName, day);
        return <div className='triangle triangle-empty'></div>
    }
    updateLet(UserName, day);

    if (pos === 'left') return <div className='triangle triangle-left' />
    else return <div className='triangle triangle-right' />
}
export { GetTriangle };