import { useState } from 'react';
import { Link } from 'react-router-dom';

import { loginUser } from '../../api/auth.js';

function LoginPage({ setAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            setAuth(true);
        } catch (error) {
            alert('Connection failed');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Connection</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don&#39;t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default LoginPage;
