import React, { useState, useEffect } from "react";
import { Coffee } from "lucide-react"; // Ensure you have the Coffee icon from Lucide or replace with your icon

const BreakTimer = ({ initialMinutes = 30, initialSeconds = 0 }) => {
  const [time, setTime] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(timer);
            setIsRunning(false);
            setIsBreakTime(true); // Show break alert
            return prevTime;
          } else if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup on unmount or stop
  }, [isRunning]);

  const startBreak = () => {
    setIsRunning(true);
    setIsBreakTime(false); // Reset the break alert
  };

  const stopBreak = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreakTime(false); // Reset the break alert
    setTime({ minutes: initialMinutes, seconds: initialSeconds });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border-l-4 border-l-emerald-400">
    <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Next Break</h3>
        <Coffee className="w-5 h-5 text-green-500" />
      </div>
      <div className="text-center">
        {isBreakTime ? (
          <div className="text-2xl font-bold text-green-700 mb-4">
            Time for a break!
          </div>
        ) : (
          <>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {String(time.minutes).padStart(2, "0")}:
              {String(time.seconds).padStart(2, "0")}
            </p>
            <p className="text-gray-600">
              {isRunning
                ? "Counting down until your next break"
                : "Time until your next break"}
            </p>
          </>
        )}
        <div className="mt-4 flex justify-center space-x-4">
          {isRunning ? (
            <button
              className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100"
              onClick={stopBreak}
            >
              Stop
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
              onClick={startBreak}
            >
              Start Break
            </button>
          )}
          <button
            className="px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakTimer;
