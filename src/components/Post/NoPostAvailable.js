import { Link } from 'react-router-dom';

import AddNew from 'icons/add-new.png';

const NoPostAvailable = ({more}) => {
    return (
        <div className='loading'>
            <h2>No {more} Posts Available</h2>
            <br />
            <br />
            Upload your new Post in
            <br />
            <br />
            <div style={{display:'flex',alignItems:'center'}}>
                <img src={AddNew} alt="Add +" style={{
                    // display: 'block',
                    textAlign: 'center',
                    width: '30px',
                    height: '30px',
                    marginRight:'10px'
                }} className='icons'/>
                Section
            </div>
            or
            <br />
            <br />
            <Link to={'/add-new'} style={{color:'blue'}}>Click Here</Link>
        </div>
    );
}
export default NoPostAvailable;