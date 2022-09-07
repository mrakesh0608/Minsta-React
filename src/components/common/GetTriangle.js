const GetTriangle = ({ pos}) => {
    if (pos=='left') 
    return <div className='triangle triangle-left'></div>
    else return <div className='triangle triangle-right'></div>
}
export default GetTriangle;