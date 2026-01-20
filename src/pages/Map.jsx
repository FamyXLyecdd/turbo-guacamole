import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { CURRICULUM } from '../data/curriculum';
import { SkillTree } from '../components/Map/SkillTree';

export const Map = () => {
  const navigate = useNavigate();
  const { completedLessons } = useGame();

  const handleLessonSelect = (id) => {
    navigate(`/lesson/${id}`);
  };

  return (
    <div className="min-h-full flex flex-col items-center">
      <div className="w-full max-w-3xl px-6 pt-10 pb-4">
        <h2 className="text-3xl font-mono font-bold text-white mb-2">System Path</h2>
        <p className="text-intp-muted">Navigate the neural network to upgrade your capabilities.</p>
      </div>

      <div className="flex-1 w-full max-w-lg">
        <SkillTree
          modules={CURRICULUM}
          completedLessons={completedLessons}
          onLessonSelect={handleLessonSelect}
        />
      </div>
    </div>
  );
};
