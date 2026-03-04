
import React from 'react';
import { Bug, BugPriority, BugStatus } from '../types';
import { AlertCircle, Clock, CheckCircle2, ChevronRight, Brain } from 'lucide-react';

interface BugCardProps {
  bug: Bug;
  onClick?: (bug: Bug) => void;
}

const PRIORITY_COLORS = {
  [BugPriority.LOW]: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  [BugPriority.MEDIUM]: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
  [BugPriority.HIGH]: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
  [BugPriority.CRITICAL]: 'text-red-400 border-red-400/20 bg-red-400/5',
};

const STATUS_ICONS = {
  [BugStatus.OPEN]: <AlertCircle className="w-4 h-4" />,
  [BugStatus.IN_PROGRESS]: <Clock className="w-4 h-4" />,
  [BugStatus.RESOLVED]: <CheckCircle2 className="w-4 h-4" />,
  [BugStatus.CLOSED]: <CheckCircle2 className="w-4 h-4 opacity-50" />,
};

export const BugCard: React.FC<BugCardProps> = ({ bug, onClick }) => {
  return (
    <div 
      onClick={() => onClick?.bug}
      className="group relative flex flex-col p-4 bg-[#141414] border border-[#2A2A2A] hover:border-[#4A4A4A] transition-all cursor-pointer overflow-hidden"
    >
      {/* Top Row: ID and Status */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-wider text-[#666] uppercase">
          {bug.id}
        </span>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-tight ${PRIORITY_COLORS[bug.priority]}`}>
          {STATUS_ICONS[bug.status]}
          {bug.priority}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-sans text-sm font-medium text-[#E4E3E0] mb-2 group-hover:text-white transition-colors">
        {bug.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#888] line-clamp-2 mb-4 leading-relaxed">
        {bug.description}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#555] uppercase tracking-widest">
            {bug.category}
          </span>
          {bug.aiAnalysis && (
            <div className="flex items-center gap-1 text-emerald-400">
              <Brain className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-tighter">AI ANALYZED</span>
            </div>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-[#444] group-hover:text-[#888] transition-colors" />
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

