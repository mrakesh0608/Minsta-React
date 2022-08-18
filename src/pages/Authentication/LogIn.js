import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "hooks/useLogin"
import 'css/Login_SignUp.css';

const LogIn = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const { login, error, isPending } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ MobEmail: Username, Password })
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
                            value={Username}
                            placeholder="Phone number, username or email"
                            onChange={e => { setUsername(e.target.value); }}
                            autoComplete="true" minLength={4} maxLength={15}
                        />
                        <input type="password" name="password" required
                            value={Password}
                            placeholder="Password"
                            onChange={e => { setPassword(e.target.value); }}
                            autoComplete="true" minLength={4} maxLength={12}
                        />
                        {error && <div className="error">{error}</div>}
                        {isPending ?
                            <button disabled>Logining ...</button> :
                            <button>Log In</button>
                        }
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