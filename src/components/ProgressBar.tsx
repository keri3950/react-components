import { useEffect, useState } from "react";

const MIN = 0;
const MAX = 100;

export function ProgressBar({
  value,
  onComplete,
}: {
  value: number;
  onComplete: () => void;
}) {
  const clampedValue = Math.min(Math.max(value, MIN), MAX);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(clampedValue);

    if (clampedValue >= MAX) {
      onComplete();
    }
  }, [clampedValue]);

  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed(0)}%
      </span>
      <div
        style={{ transform: `translateX(${percent - MAX}%)` }}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
      />
    </div>
  );
}

export function AnimatedProgressBar() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((value) => value + 0.1);
    }, 20);
  }, []);

  return (
    <div>
      <ProgressBar value={value} onComplete={() => setSuccess(true)} />
      <span className="progress-state">
        {success ? "Complete" : "Loading..."}
      </span>
    </div>
  );
}
