import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Terminal, ArrowRight, Cpu, Code } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-intp-base flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-intp-highlight/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-2xl flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center w-20 h-20 rounded-2xl bg-intp-surface border border-intp-highlight/20 shadow-[0_0_30px_rgba(56,189,248,0.3)] mb-4"
        >
          <Terminal size={40} className="text-intp-highlight" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-intp-highlight to-intp-accent"
        >
          THE ARCHITECT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-intp-muted font-light max-w-lg"
        >
          Master the language of the machine. Build your logic. Construct your reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link to="/map">
            <Button size="lg" className="w-full sm:w-auto gap-3 text-lg group">
              Initialize System <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Documentation
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 text-xs text-intp-muted/60 font-mono uppercase tracking-widest"
        >
          <div className="flex flex-col items-center gap-2">
            <Cpu size={20} />
            <span>Browser Native</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Code size={20} />
            <span>Python 3.11</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center gap-2">
            <Terminal size={20} />
            <span>Interactive</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
