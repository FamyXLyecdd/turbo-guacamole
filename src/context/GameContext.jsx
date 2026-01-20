import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);

  // New State
  const [streak, setStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [cpuCycles, setCpuCycles] = useState(5); // Hearts
  const [achievements, setAchievements] = useState([]);

  // Load state
  useEffect(() => {
    try {
      const saved = localStorage.getItem('intp_python_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setCompletedLessons(parsed.completedLessons || []);
        setStreak(parsed.streak || 0);
        setLastLoginDate(parsed.lastLoginDate || null);
        setCpuCycles(parsed.cpuCycles ?? 5);
        setAchievements(parsed.achievements || []);

        // Initial streak check (reset if missed a day)
        checkStreakValidity(parsed.lastLoginDate, parsed.streak);
      }
    } catch (e) {
      console.error("Failed to load save", e);
    }
  }, []);

  // Persist state
  useEffect(() => {
    const data = {
      xp,
      completedLessons,
      streak,
      lastLoginDate,
      cpuCycles,
      achievements
    };
    localStorage.setItem('intp_python_save', JSON.stringify(data));

    // Level calc
    const newLevel = 1 + Math.floor(xp / 500);
    if (newLevel !== level) setLevel(newLevel);

  }, [xp, completedLessons, streak, lastLoginDate, cpuCycles, achievements, level]);

  const checkStreakValidity = (savedLastLogin, savedStreak) => {
    if (!savedLastLogin) return;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If last login was before yesterday, streak is broken
    if (savedLastLogin < yesterdayStr) {
       setStreak(0);
    }
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (lastLoginDate === today) return; // Already counted today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastLoginDate === yesterdayStr) {
      setStreak(prev => prev + 1);
    } else {
      // If we are here, and lastLogin was today, we returned above.
      // If lastLogin was yesterday, we incremented.
      // If lastLogin was older, we reset to 1.
      setStreak(1);
    }
    setLastLoginDate(today);
  };

  const completeLesson = (lessonId, earnedXp) => {
    // Always update streak on completion activity
    updateStreak();

    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setXp(prev => prev + earnedXp);
      return true;
    }
    return false;
  };

  const deductCpuCycle = () => {
    setCpuCycles(prev => Math.max(0, prev - 1));
  };

  const refillCpu = () => {
      setCpuCycles(5);
  };

  const isLessonCompleted = (id) => completedLessons.includes(id);

  return (
    <GameContext.Provider value={{
      xp,
      level,
      completedLessons,
      streak,
      cpuCycles,
      achievements,
      completeLesson,
      isLessonCompleted,
      deductCpuCycle,
      refillCpu
    }}>
      {children}
    </GameContext.Provider>
  );
};
