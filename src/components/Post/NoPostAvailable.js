import { Link } from 'react-router-dom';

import AddNew from 'icons/add-new.png';

const NoPostAvailable = ({ more }) => {

    return (
        <div className='loading' style={more ?
            { minHeight: '40vh' } : {}
        }>
            <h2>
                {window.location.pathname === '/' ?
                    more ? 'End of Posts' : 'No Posts' : ''}
                {window.location.pathname === '/explore' ? 'No ' + (more?more:'') + ' Posts Available' : ''}
                {(window.location.pathname).substring(0, 6) === '/user/' ? 'End of Posts' : ''}
                {window.location.pathname === '/user' ?
                    more ? 'End of Your Posts' : 'Share Your First Post' : ''}
            </h2>
            <br />
            {(window.location.pathname).substring(0, 6) === '/user/' ? '' :
                <div>
                    {window.location.pathname === '/' ? 'Follow more friends to see their posts or' : ''}
                    <br />
                    Upload your new Post in
                    <br />
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={AddNew} alt="Add +" style={{
                            // display: 'block',
                            textAlign: 'center',
                            width: '30px',
                            height: '30px',
                            marginRight: '10px'
                        }} className='icons' />
                        Section
                    </div>
                    or
                    <br />
                    <Link to={'/add-new'} style={{ color: 'blue' }}>Click Here</Link>
                </div>
            }
        </div>
    );
}
export default NoPostAvailable;