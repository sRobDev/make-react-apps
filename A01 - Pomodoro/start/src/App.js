import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const TIME = 25 * 60;
  const [timeLeft, setTimeLeft] = useState(TIME);
  const [title, setTitle] = useState('Let the countdown begin!');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  function startTimer() {
    if(intervalRef.current !== null) return;

    setTitle("You're doing great!")
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if(intervalRef.current === null) return;
    
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Keep it up!');
    setIsRunning(false)
  }

  function resetTimer(){
    setTitle('Ready to go another round?');
    clearInterval(intervalRef.current)
    intervalRef.current = null;
    setTimeLeft(TIME);
    setIsRunning(false);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {isRunning && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
