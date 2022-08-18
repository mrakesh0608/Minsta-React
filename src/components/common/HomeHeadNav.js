import { Link } from 'react-router-dom';

import {addNewIcon,msgIcon} from 'helpers/importsIcons';

const HomeHeadNav = () => {

    return (
        <div id="home-head" className='nav-head hideOnScroll hideOnScroll-head'>
            <div><Link to="/"><h2 className='logo-text'>Minsta</h2></Link></div>
            <div style={{ display: 'flex' }}>
                <Link to="/add-new">
                    <div id='add-new' className="nav-icons">
                        <img src={addNewIcon} alt="addNew" />
                    </div>
                </Link>
                <Link to="/messenger" style={{marginLeft:'10px'}}>
                    <div id='msg' className="nav-icons">
                        <img src={msgIcon} alt="msg" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default HomeHeadNav;