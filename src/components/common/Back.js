import {useNavigate} from 'react-router-dom';
import {iconPath} from 'helpers/Path';

const Back = () => {
    const navigate = useNavigate();
    return (
        <div className='nav-icons' onClick={() => { navigate(-1) }}>
            <img src={iconPath + 'left-arrow.png'} alt="left-arrow" />
        </div>
    );
}
export default Back;