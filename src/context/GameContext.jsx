import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('intp_python_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setCompletedLessons(parsed.completedLessons || []);
        setStreak(parsed.streak || 0);
      }
    } catch (e) {
      console.error("Failed to load save", e);
    }
  }, []);

  // Persist state
  useEffect(() => {
    const data = { xp, completedLessons, streak };
    localStorage.setItem('intp_python_save', JSON.stringify(data));

    // Level calc: Level = 1 + floor(XP / 500)
    const newLevel = 1 + Math.floor(xp / 500);
    if (newLevel !== level) setLevel(newLevel);

  }, [xp, completedLessons, streak, level]);

  const completeLesson = (lessonId, earnedXp) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setXp(prev => prev + earnedXp);
      // Increment streak logic could go here (check dates), simplifying for now
      setStreak(prev => prev + 1);
      return true;
    }
    return false;
  };

  const isLessonCompleted = (id) => completedLessons.includes(id);

  return (
    <GameContext.Provider value={{
      xp,
      level,
      completedLessons,
      streak,
      completeLesson,
      isLessonCompleted
    }}>
      {children}
    </GameContext.Provider>
  );
};
