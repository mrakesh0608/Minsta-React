import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import {REST_API_Sync} from 'helpers/REST_API';

import 'css/Login_SignUp.css';

const SignUp = () => {

    const [MobEmail, setMobEmail] = useState('');
    const [Name, setName] = useState('');
    const [Pass, setPass] = useState('');
    const [UserName, setUserName] = useState('');

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        setIsPending(true);
        e.preventDefault();
        console.log(MobEmail, Name, Pass, UserName);

        const newUser = { MobEmail, Name, Pass, UserName };

        const data = await REST_API_Sync({path:'/users',method:"POST",payload:newUser});

        if(data.result){
            console.log('new user added');
            setIsPending(false);
            alert('Welcome ' + Name);
            history.push('/');
        }
        else console.log(data);
    }

    return (
        <div className='auth-div'>
            <div id="signup" className="auth">
                <div>
                    <h1>Minsta</h1>
                </div>
                <div id="signup-content">
                    <form onSubmit={handleSubmit} className="auth-form">
                        <p id='signSee'>Sign up to see photos and videos from your friends.</p>
                        <input
                            type="text" name="MobEmail" required
                            placeholder="Mobile Number or Email"
                            value={MobEmail}
                            onChange={e => { setMobEmail(e.target.value) }}
                            autoComplete="true"
                        />
                        <input
                            type="text" name="fullname" required
                            placeholder="Full name"
                            value={Name}
                            onChange={e => { setName(e.target.value) }}
                            autoComplete="true"
                        />
                        <input type="text" name="username" required
                            placeholder="Username"
                            value={UserName}
                            onChange={e => { setUserName(e.target.value) }}
                            autoComplete="true"
                        />
                        <input type="password" name="password" required
                            placeholder="Password"
                            value={Pass}
                            onChange={e => { setPass(e.target.value) }}
                            autoComplete="true"
                        />
                        <p className="TC">By signing up, you agree to our <Link to='/terms'>Terms</Link> , <Link to='/data-policy'>Data Policy</Link> and <Link to='/cookies-policy'>Cookies Policy</Link> .</p>
                        {!isPending && <button>Sign Up</button>}
                        {isPending && <button>Signing Up ...</button>}
                    </form>
                    <p>Have an account? <Link to='/login'>Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;