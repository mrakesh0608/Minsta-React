import { Link } from 'react-router-dom';

import addNew from 'icons/add-new.png';
import msg from 'icons/msg.png';

const HomeHeadNav = () => {

    return (
        <div id="home-head" className='nav-head hideOnScroll hideOnScroll-head'>
            <div><Link to="/"><h2 className='logo-text'>Minsta</h2></Link></div>
            <div style={{ display: 'flex' }}>
                <Link to="/add-new">
                    <div id='add-new' className="nav-icons">
                        <img src={addNew} alt="addNew" />
                    </div>
                </Link>
                <Link to="/messenger" style={{marginLeft:'10px'}}>
                    <div id='msg' className="nav-icons">
                        <img src={msg} alt="msg" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default HomeHeadNav;