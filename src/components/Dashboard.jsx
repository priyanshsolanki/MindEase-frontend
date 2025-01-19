import React, { useState } from 'react';
import { Bell, User, Coffee, Award, Clock, TrendingUp, X } from 'lucide-react';
import BreakTimer from './BreakTimer';

const Dashboard = () => {
  const [mood, setMood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [moodMessage, setMoodMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const fetchMoodMessage = async (selectedMood) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: selectedMood }),
      });
      if (!response.ok) throw new Error("Failed to fetch mood message");
      const data = await response.json();
      setMoodMessage(data.message);
    } catch (error) {
      setMoodMessage("Sorry, we couldn't fetch the suggestion. Try again later.");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleMoodClick = (selectedMood) => {
    setMood(selectedMood);
    fetchMoodMessage(selectedMood);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mood Check Section */}
        <div className="bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4] rounded-xl p-8 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#1E293B] mb-3">
              {getCurrentTimeGreeting()}, Priyansh
            </h2>
            <p className="text-[#64748B] mb-6">
              Remember to take mindful breaks and celebrate your achievements today 🌟
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[#64748B]">How are you feeling?</span>
              <div className="flex gap-3">
               
                 {[
                  { emoji: '😊', label: 'Great' },
                  { emoji: '😌', label: 'Calm' },
                  { emoji: '😐', label: 'Neutral' },
                  { emoji: '😓', label: 'Stressed' }
                ].map(({ emoji, label }) => (
                  <button
                    key={label}
                    onClick={() => handleMoodClick(label)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                      ${mood === label
                        ? 'bg-white shadow-sm text-[#334155]'
                        : 'hover:bg-white/50 text-[#64748B]'}`}
                  >
                    <span>{emoji}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mood Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-medium text-gray-800">Mood Suggestion</h4>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </button>
              </div>
              {loading ? (
                <p className="text-gray-600">Fetching suggestions...</p>
              ) : (
                <p className="text-gray-600">{moodMessage}</p>
              )}
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}


        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Task */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border-l-4 border-l-sky-400">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-medium text-gray-800">Current Task</h3>
              <div className="p-2 rounded-full bg-sky-50">
                <Clock className="w-5 h-5 text-sky-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">API Integration for User Auth</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated completion</span>
                <span className="font-medium">4.5 hours</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-sky-500 rounded-full h-2 w-1/3 transition-all duration-500"></div>
              </div>
            </div>
          </div>

          {/* Break Timer */}
          <BreakTimer />

          {/* Daily Achievements */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border-l-4 border-l-amber-400">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-medium text-gray-800">Today's Wins</h3>
              <div className="p-2 rounded-full bg-amber-50">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <ul className="space-y-3">
              {[
                'Completed user authentication',
                'Fixed critical bug in production',
                'Code review for team members'
              ].map((achievement, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border-l-4 border-l-teal-400">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-medium text-gray-800">Weekly Progress</h3>
              <div className="p-2 rounded-full bg-teal-50">
                <TrendingUp className="w-5 h-5 text-teal-600" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-medium">15/20</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-teal-500 rounded-full h-2 w-3/4 transition-all duration-500"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Work-Life Balance</span>
                  <span className="font-medium text-emerald-600">Good</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 rounded-full h-2 w-4/5 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mood Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-medium text-gray-800">Mood Suggestion</h4>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </button>
              </div>
              <p className="text-gray-600">{moodMessage}</p>
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
