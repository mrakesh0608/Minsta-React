import { Link } from 'react-router-dom';

import { addNewIcon } from 'helpers/importsIcons';
import { useEffect, useState } from 'react';

const NoPostAvailable = ({ more }) => {

    const [uploadDiv, setUploadDiv] = useState(true);
    const [followToSee, setFollowToSee] = useState(false);
    const [height, setHeight] = useState(false);
    const [title, setTitle] = useState('No Posts');
    useEffect(() => {
        dd();
    }, [])

    const dd = () => {
        const path = window.location.pathname;
        if (path.substring(0, 6) === '/user/') {
            setUploadDiv(false);
            setTitle(more ? 'End of Posts' : 'No Posts')
            setHeight('250px');
            return;
        }
        switch (path) {
            case '/': {
                setFollowToSee(true);
                setTitle(more ? 'End of Posts' : 'No Posts')
                return;
            }
            case '/explore': {
                setTitle('No ' + (more ? more : '') + ' Posts Available');
                return;
            }
            case '/user': {
                setTitle(more ? 'End of Your Posts' : 'Share Your First Post');
                setHeight('250px');
                return;
            }
            default: {
                setTitle('No Posts')
                return;
            }
        }
    }
    return (
        <div className='loading' style={{
            minHeight:
                (height ?
                    height :
                    (more ? '250px' : '')
                )
        }}>
            <h2>{title}</h2>
            <br />
            {uploadDiv &&
                <div>
                    {followToSee && `Follow ${more ? more : ''} friends to see their posts or`}
                    <br />
                    Upload your new Post in
                    <br />
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={addNewIcon} alt="Add +" style={{
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