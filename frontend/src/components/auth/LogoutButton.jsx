import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../api/auth.js';

function LogoutButton({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();

            if (onLogout) {
                onLogout();
            }

            navigate('/login');
        } catch (error) {
            console.error('Error while disconnecting', error);
        }
    };

    return (
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded-md text-white">
            Logout
        </button>
    );
}

export default LogoutButton;
