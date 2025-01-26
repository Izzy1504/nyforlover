import React, { useState, useEffect } from 'react';

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="countdown">
      {count > 0 ? (
        <span>{count}</span>
      ) : (
        <span>Bắt đầu!</span>
      )}
    </div>
  );
};

export default Countdown;