import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../api/auth.js';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Registration</h2>
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
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account?
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
