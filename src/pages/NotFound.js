import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const NotFound = () => {

    const history = useHistory();
    const [time, setTime] = useState(5);

    useEffect(() => {

        setTimeout(() => {
            setTime(time - 1);

            if (time === 1) history.push('/')
        }, 1000);

    });
    return (
        <div id="not-found">
            <div id="not-found-content">
                <div id="soon" className="loading">
                    <h2>Sorry, this Page can't be found</h2><br />
                    <p>Go back to <Link to='/' style={{ color: 'blue' }}>HomePage</Link> ...</p><br />
                    <p>auto re-directing to HomePage<br />in {time} sec</p>
                </div>
            </div>
        </div>
    );
}
export default NotFound;