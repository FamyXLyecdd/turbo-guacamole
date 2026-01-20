import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { Home, Map, Trophy, Terminal, Zap, Code2 } from 'lucide-react';
import { cn } from '../ui/Button';

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={cn(
      "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 md:flex-row md:justify-start md:w-full md:px-4 md:gap-3",
      active
        ? "text-intp-highlight bg-intp-highlight/10 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
        : "text-intp-muted hover:text-white hover:bg-white/5"
    )}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] mt-1 md:mt-0 md:text-sm font-medium">{label}</span>
  </Link>
);

export const Shell = () => {
  const { xp, level, streak } = useGame();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/map', icon: Map, label: 'Path' },
    { to: '/practice', icon: Code2, label: 'Practice' }, // Placeholder for freestyle
  ];

  return (
    <div className="flex flex-col h-screen bg-intp-base text-white overflow-hidden md:flex-row">
      {/* Sidebar (Desktop) / Bottom Bar (Mobile) */}
      <nav className="
        order-2 md:order-1
        w-full h-16 md:w-20 lg:w-64 md:h-full
        bg-intp-surface/50 backdrop-blur-lg border-t md:border-t-0 md:border-r border-white/5
        flex md:flex-col items-center justify-around md:justify-start md:py-8 z-50
        shrink-0
      ">
        {/* Brand */}
        <div className="hidden md:flex items-center gap-2 mb-8 px-4 text-intp-highlight">
          <Terminal size={32} />
          <span className="hidden lg:block font-bold font-mono tracking-tighter text-xl">PY.ARCHITECT</span>
        </div>

        {/* Stats (Mobile hidden mostly, Desktop visible) */}
        <div className="hidden md:flex flex-col gap-4 w-full px-4 mb-8">
          <div className="bg-intp-base/50 p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-xs text-intp-muted mb-1">
              <Zap size={14} className="text-yellow-400" />
              <span>Level {level}</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-intp-highlight transition-all duration-500"
                style={{ width: `${(xp % 500) / 5}%` }}
              />
            </div>
            <div className="text-[10px] text-right mt-1 font-mono">{xp} XP</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex md:flex-col w-full md:px-2 gap-1 md:gap-2 justify-evenly md:justify-start">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              active={location.pathname === item.to}
            />
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="order-1 md:order-2 flex-1 relative overflow-hidden flex flex-col">
        {/* Mobile Header (Stats) */}
        <header className="md:hidden h-14 flex items-center justify-between px-4 border-b border-white/5 bg-intp-surface/30 backdrop-blur">
          <div className="flex items-center gap-2 font-mono font-bold text-intp-highlight">
            <Terminal size={20} />
            <span>ARCHITECT</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-yellow-400" />
              <span>{level}</span>
            </div>
            <div className="px-2 py-0.5 bg-intp-highlight/10 text-intp-highlight rounded border border-intp-highlight/20">
              {xp} XP
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
           <Outlet />
        </div>
      </main>
    </div>
  );
};
