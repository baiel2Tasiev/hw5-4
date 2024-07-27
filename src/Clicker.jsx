import React, { useState, useEffect, useRef } from "react";
import "./style.css"

const Clicker = () => {
  const [clicks, setClicks] = useState(0);
  const [time, setTime] = useState(10);
  const [millisecondsRemaining, setMillisecondsRemaining] = useState(0);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setMillisecondsRemaining(prev => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setClicksPerSecond((clicks / time).toFixed(2));
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, clicks, time]);

  const handleClick = () => {
    if (!isRunning) {
      setClicks(0);
      setClicksPerSecond(0);
      setMillisecondsRemaining(time * 1000);
      setIsRunning(true);
    }
    setClicks(prev => prev + 1);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setClicks(0);
    setMillisecondsRemaining(time * 1000);
    setClicksPerSecond(0);
    setIsRunning(false);
  };


  
  return (
    
    <div>
      <div className="wrapper">?
        <div className="wrapper-top">
          <div className="wrapper-top-item">
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(Math.max(5, Math.min(15, e.target.value)))}
            />
            <p>
              время {Math.floor(millisecondsRemaining / 1000)}.
              {Math.floor((millisecondsRemaining % 1000) / 10)} секунды
            </p>
          </div>
          <div className="wrapper-top-item">
            <p>кол-во кликов: {clicks}</p>
          </div>
          <div className="wrapper-top-item">
            <p>кол-во кликов в секунду: {clicksPerSecond}</p>
          </div>
        </div>
        <div className="wrapper-bottom">
          <button
            onClick={handleClick}
            disabled={millisecondsRemaining <= 0 && isRunning}
          >
            Click Me!
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Clicker;
