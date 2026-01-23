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
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full p-8">
                <div className="pt-[15vh] font-apple font-bold text-4xl">Welcome Back</div>
                <input
                    className="border-b-2 border-ios-quaternary placeholder:text-ios-secondary pb-4 focus:outline-none"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    className="border-b-2 border-ios-quaternary placeholder:text-ios-secondary pb-4 focus:outline-none"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="bg-blue-500 text-white rounded-full px-10 py-4" type="submit">
                    Log In
                </button>
            </form>
            <p>
                Don&#39;t have an account?{' '}
                <Link to="/register" className="text-blue-500">
                    Register
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;
