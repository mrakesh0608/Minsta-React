import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const NotFound = () => {

    const { msg } = useParams();
    const navigate = useNavigate();
    const [time, setTime] = useState(5);

    useEffect(() => {
        console.log("msg", msg);
        setTimeout(() => {
            setTime(time - 1);

            if (time === 1) navigate('/')
        }, 1000);

    }, [time]);
    return (
        <div id="not-found">
            <div id="not-found-content">
                <div id="soon" className="loading">
                    <h2>{msg?msg:"Sorry, this Page can't be found"}</h2><br />
                    <p>Go back to <Link to='/' style={{ color: 'blue' }}>HomePage</Link> ...</p><br />
                    <p>auto re-directing to HomePage<br />in {time} sec</p>
                </div>
            </div>
        </div>
    );
}
export default NotFound;