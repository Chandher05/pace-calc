import React, { useState, useEffect } from "react";

const PaceCalculator = () => {
  const [distance, setDistance] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [pace, setPace] = useState({ minutes: 0, seconds: 0 });
  const [animate, setAnimate] = useState(false);

  const validateTimeFormat = (input) => {
    const timePattern = /^\d{1,2}:\d{2}:\d{2}$/;
    return timePattern.test(input);
  };

  const calculatePace = () => {
    if (!validateTimeFormat(timeInput)) {
      alert("Please enter time in format hh:mm:ss");
      return;
    }

    const [hours, minutes, seconds] = timeInput.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const distanceNum = parseFloat(distance);

    if (totalSeconds > 0 && distanceNum > 0) {
      const paceInSeconds = totalSeconds / distanceNum;
      const paceMinutes = Math.floor(paceInSeconds / 60);
      const paceSeconds = Math.round(paceInSeconds % 60);
      setPace({ minutes: paceMinutes, seconds: paceSeconds });
      setAnimate(true);
    } else {
      setPace({ minutes: 0, seconds: 0 });
    }
  };

  const formatPace = () => {
    return `${pace.minutes}:${pace.seconds.toString().padStart(2, "0")}/km`;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Trecho Pace Calculator
        </h2>
        <p className="text-gray-600 text-sm">Calculate your running pace</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Distance (km)
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter distance"
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Time (hh:mm:ss)
          </label>
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 01:30:00"
          />
        </div>

        <button
          onClick={calculatePace}
          className="hover:cursor-pointer w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          Calculate Pace
        </button>

        <div className="mt-6 text-center">
          <div className="text-gray-600 text-sm mb-1">Your Pace</div>
          <div
            className={`text-3xl font-bold text-gray-800 transition-all duration-300 ${
              animate ? "scale-110 animate-pulse" : "scale-100"
            }`}
            onAnimationEnd={() => setAnimate(false)}
          >
            {formatPace()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaceCalculator;
