import React, { useMemo } from 'react';
import { SkillNode } from './SkillNode';
import { motion } from 'framer-motion';

export const SkillTree = ({ modules, completedLessons, onLessonSelect }) => {
  // Flatten curriculum to a linear path for simplicity in MVP
  // In a real app, this would be a directed acyclic graph

  const nodes = useMemo(() => {
    let nodeList = [];
    let globalIndex = 0;

    modules.forEach((module, mIdx) => {
      module.lessons.forEach((lesson, lIdx) => {
        const isEven = globalIndex % 2 === 0;
        nodeList.push({
          ...lesson,
          moduleId: module.id,
          x: isEven ? '50%' : '50%', // Centered for now? Or Zigzag?
          // Let's do a slight zigzag: 40% / 60%
          // Actually, let's keep it centered for mobile responsiveness simplicity,
          // but maybe offset purely for visuals if desktop.
          // Let's stick to centered vertical line for "The Path"
          xPercent: 50 + (globalIndex % 2 === 0 ? -10 : 10),
          y: globalIndex * 120 + 100,
          status: completedLessons.includes(lesson.id)
            ? 'completed'
            : (nodeList.length === 0 || completedLessons.includes(nodeList[nodeList.length - 1].id)) // If prev is complete
              ? 'available'
              : 'locked'
        });
        globalIndex++;
      });
    });
    return nodeList;
  }, [modules, completedLessons]);

  return (
    <div className="relative w-full min-h-screen py-20 overflow-x-hidden">

      {/* Connecting Lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B1120" stopOpacity="0" />
            <stop offset="10%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="90%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
          </linearGradient>
        </defs>
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prev = nodes[i - 1];
          return (
            <motion.path
              key={`path-${i}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              d={`M ${prev.xPercent}% ${prev.y} C ${prev.xPercent}% ${prev.y + 60}, ${node.xPercent}% ${node.y - 60}, ${node.xPercent}% ${node.y}`}
              stroke={node.status === 'locked' ? '#334155' : 'url(#lineGradient)'}
              strokeWidth="2"
              fill="none"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      <div className="relative z-10 w-full h-full">
        {nodes.map((node) => (
          <SkillNode
            key={node.id}
            {...node}
            x={`${node.xPercent}%`}
            y={node.y}
            onClick={() => onLessonSelect(node.id)}
          />
        ))}
      </div>

      {/* Bottom Spacer */}
      <div style={{ height: nodes.length * 120 + 200 }} />
    </div>
  );
};
