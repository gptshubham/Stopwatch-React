import React, { useState, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const intervalReference = useRef(null);
  const [isActive, setIsActive] = useState(false);
  // const [isRunning, setIsRunning] = useState(false);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    const milliseconds = Math.floor((timeInSeconds % 1) * 100);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const start = () => {
    // if (!isRunning) {
    //   intervalReference.current = setInterval(() => {
    //     setTime((prevTime) => prevTime + 1);
    //     console.log(time);
    //   }, 1000);
    //   setIsRunning(true);
    // }
    setIsActive(true);
    intervalReference.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  function stop() {
    // if (isRunning) {
    //   clearInterval(intervalReference.current);
    //   intervalReference.current = null;
    //   setIsRunning(false);
    // }
    setIsActive(false);
    clearInterval(intervalReference.current);
    intervalReference.current = null;
  }

  const reset = () => {
    clearInterval(intervalReference.current);
    intervalReference.current = null;
    setTime(0);
    setIsActive(false);
    // setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="bg-gray-800/50 backdrop-blur-lg p-4 sm:p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-md mx-auto">
        <div className="flex items-center justify-center mb-4 sm:mb-8 space-x-2 sm:space-x-3">
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Stopwatch
          </h1>
        </div>

        <div className="relative">
          <div className="text-4xl sm:text-5xl md:text-7xl font-mono mb-6 sm:mb-8 md:mb-12 text-center tracking-wider relative z-10">
            {formatTime(time)}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            className={`group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 ${
              isActive
                ? 'bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700'
                : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
            } text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              isActive ? 'focus:ring-red-500' : 'focus:ring-green-500'
            } w-full sm:w-auto`}
            onClick={() => {
              if (isActive) {
                stop();
              } else {
                clearInterval(intervalReference.current);
                intervalReference.current = null;
                start();
              }
            }}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start</span>
              </>
            )}
          </button>

          <button
            className={`flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              time === 0 ? 'opacity-50 cursor-not-allowed' : ''
            } w-full sm:w-auto`}
            onClick={reset}
            disabled={time === 0}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
