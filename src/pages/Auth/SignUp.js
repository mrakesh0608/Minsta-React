import { useState } from "react";
import { Link } from "react-router-dom";

import { useSignup } from "hooks/auth/useSignup"

import 'css/Login_SignUp.css';

const SignUp = () => {

    const [MobEmail, setMobEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Username, setUsername] = useState('');

    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup({ MobEmail, Name, Password, Username });
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
                        <input type="text" name="Username" required
                            placeholder="Username"
                            value={Username}
                            onChange={e => { setUsername(e.target.value) }}
                            autoComplete="true"
                        />
                        <input type="password" name="password" required
                            placeholder="Password"
                            value={Password}
                            onChange={e => { setPassword(e.target.value) }}
                            autoComplete="true"
                        />
                        <p className="TC">By signing up, you agree to our <Link to='/terms'>Terms</Link> , <Link to='/data-policy'>Data Policy</Link> and <Link to='/cookies-policy'>Cookies Policy</Link> .</p>
                        {error && <div className="error">{error}</div>}
                        {isLoading ?
                            <button disabled>Signing Up ...</button> :
                            <button>Sign Up</button>
                        }
                    </form>
                    <p>Have an account? <Link to='/login'>Log in</Link></p>
                </div>
            </div>
        </div>
    );
}
export default SignUp;