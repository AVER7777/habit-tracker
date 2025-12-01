import {
    isToday,
    isYesterday,
    subWeeks,
    subDays,
    isSameDay,
    startOfWeek,
    differenceInCalendarWeeks,
    isSameWeek,
} from 'date-fns';

export function calculateLiveStreak(currentStreak, lastEntryDate, frequency) {
    if (!lastEntryDate || currentStreak === 0) {
        return 0;
    }

    const lastDate = new Date(lastEntryDate);

    if (frequency === 7) {
        if (!isToday(lastDate) && !isYesterday(lastDate)) {
            return 0;
        }
    } else {
        const today = new Date();
        const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
        const startOfPreviousWeek = subWeeks(startOfCurrentWeek, 1);

        if (lastDate < startOfPreviousWeek) {
            return 0;
        }
    }

    return currentStreak;
}

export function calculateDailyStreak(dates) {
    if (dates.length === 0) {
        return 0;
    }

    const lastEntry = dates[0];

    if (!isToday(lastEntry) && !isYesterday(lastEntry)) {
        return 0;
    }

    let streak = 1;
    let expected = subDays(lastEntry, 1);

    for (let i = 1; i < dates.length; i++) {
        if (isSameDay(dates[i], expected)) {
            streak++;
            expected = subDays(expected, 1);
        } else {
            break;
        }
    }

    return streak;
}

export function calculateWeeklyStreak(dates, frequency) {
    if (dates.length === 0) {
        return 0;
    }

    const oldestEntryDate = dates[dates.length - 1];
    const today = new Date();

    const maxWeeksToCheck =
        differenceInCalendarWeeks(today, oldestEntryDate, { weekStartsOn: 1 }) + 1;

    let streak = 0;

    for (let weekOffset = 0; weekOffset < maxWeeksToCheck; weekOffset++) {
        const target = subWeeks(new Date(), weekOffset);

        const count = dates.filter((d) => isSameWeek(d, target, { weekStartsOn: 1 })).length;

        if (count >= frequency) {
            streak++;
        } else {
            if (weekOffset > 0) {
                break;
            }
        }
    }

    return streak;
}
