import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export function getLocalDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getCurrentWeekDates(weekStartsOn = 0) {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn });
    const end = endOfWeek(today, { weekStartsOn });

    const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const dates = eachDayOfInterval({ start: start, end: end });

    const weekDates = [];

    for (let i = 0; i < 7; i++) {
        weekDates.push({
            letter: dayLetters[i],
            dateString: format(dates[i], 'yyyy-MM-dd'),
        });
    }

    return weekDates;
}
