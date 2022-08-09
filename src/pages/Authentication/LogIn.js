import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import 'css/Login_SignUp.css';

import {REST_API_Sync} from 'helpers/REST_API';

const LogIn = () => {

    const [UserName, setUserName] = useState('');
    const [Pass, setPass] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [InvalidUser, setInValidUser] = useState(false);

    const history = useHistory();

    const handleSubmit = async (e) => {
        setIsPending(true);
        e.preventDefault();

        const newUser = { UserName, Pass };
        console.log(newUser);

        const data = await REST_API_Sync({path:'/users',method:"GET"});

        fetch('users?UserName=' + UserName + '&Pass=' + Pass)
            .then(res => { return res.json() })
            .then(data => {
                setIsPending(false);
                if (data.length === 0) setInValidUser(true);
                else {
                    console.log(data);
                    alert('Welcome ' + data[0].Name);
                    // history.push('/', { params: UserName });
                }
            })
            .catch(err=>console.log(err));

    }

    return (
        <div className="auth-div">

            <div id="login" className="auth">
                <div>
                    <h1>Minsta</h1>
                </div>
                <div id="login-content">
                    <form onSubmit={handleSubmit} className="auth-form">
                        <input type="text" name="username" required
                            value={UserName}
                            placeholder="Phone number, username or email"
                            onChange={e => { setUserName(e.target.value); setInValidUser(false);}}
                            autoComplete="true" minLength={4} maxLength={15}
                        />
                        <input type="password" name="password" required
                            value={Pass}
                            placeholder="Password"
                            onChange={e => { setPass(e.target.value); setInValidUser(false);}}
                            autoComplete="true" minLength={4} maxLength={12}
                        />
                        {!isPending && InvalidUser && <p style={{ color: 'red' }}>Bad Crediantials</p>}
                        {!isPending && <button>Log In</button>}
                        {isPending && <button>Logining ...</button>}
                    </form>
                    <Link to='/forgot' className='forgot'>Forgot Password?</Link>
                    <br /><br />
                    <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LogIn;