import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();
    const [time, setTime] = useState(5);

    useEffect(() => {

        setTimeout(() => {
            setTime(time - 1);

            if (time === 1) navigate('/')
        }, 1000);

    },[time]);
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