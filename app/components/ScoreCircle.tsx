import { useEffect, useState } from 'react';

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const [displayScore, setDisplayScore] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    // Animate the score counting up
    const duration = 1000; // 1 second animation
    const step = Math.ceil(score / 20); // Update in 20 steps
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, score);
      setDisplayScore(current);

      // Update circle progress
      const progress = current / 100;
      setStrokeDashoffset(circumference * (1 - progress));

      if (current >= score) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [score, circumference]);

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* Partial circle with gradient */}
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF97AD" />
            <stop offset="100%" stopColor="#5171FF" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>

      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold text-sm">{`${displayScore}/100`}</span>
      </div>
    </div>
  );
};

export default ScoreCircle;