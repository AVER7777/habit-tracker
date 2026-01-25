import CheckIcon from './CheckIcon.jsx';

const ProgressCircleIcon = ({ current, total, size = 42, color, checked }) => {
    const safeTotal = total > 0 ? total : 1;
    const isFinished = current >= safeTotal || (safeTotal === 1 && checked);
    const showWhiteIcon = isFinished || checked;

    const percentage = Math.min((current / safeTotal) * 100, 100);

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg
                className="absolute inset-0 w-full h-full"
                style={{ transform: 'rotate(-90deg)' }}
                viewBox="0 0 50 50"
            >
                {/* background */}
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white/10"
                />

                {/* progress bar */}
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    stroke={isFinished ? 'white' : color}
                    strokeWidth="4"
                    fill={isFinished ? color : 'transparent'}
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: offset,
                        transition: 'all 0.5s ease-in-out',
                    }}
                    strokeLinecap="round"
                />
            </svg>

            {/* check icon */}
            <CheckIcon
                className={`relative z-10 w-1/3 h-1/3 transition-colors duration-300 ${
                    showWhiteIcon ? 'text-white' : 'text-ios-quaternary'
                }`}
            />
        </div>
    );
};

export default ProgressCircleIcon;
