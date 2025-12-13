import { useEffect, useState } from 'react';

import { getAllHabits } from '../../api/habits.js';
import LogoutButton from '../../components/auth/LogoutButton.jsx';
import CreateHabitButton from '../../components/habits/CreateHabitButton.jsx';
import HabitGrid from '../../components/habits/HabitGrid.jsx';

function TodayPage({ onLogout }) {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllHabits()
            .then((data) => {
                setHabits(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Loading error', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto mt-2 w-full px-2 pt-2 lg:w-3/5 flex flex-col min-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Today</h1>
                <CreateHabitButton />
            </div>

            <div className="flex-1">
                {loading ? <p>Loading...</p> : <HabitGrid habits={habits} />}
            </div>

            <LogoutButton onLogout={onLogout} />
        </div>
    );
}

export default TodayPage;
