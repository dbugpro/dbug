
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CellProps
} from 'recharts';
import { Bug, BugPriority, BugStatus } from '../types';

interface StatsVisualizerProps {
  bugs: Bug[];
}

const COLORS = {
  [BugPriority.LOW]: '#60A5FA',
  [BugPriority.MEDIUM]: '#FACC15',
  [BugPriority.HIGH]: '#FB923C',
  [BugPriority.CRITICAL]: '#F87171',
};

const STATUS_COLORS = {
  [BugStatus.OPEN]: '#F87171',
  [BugStatus.IN_PROGRESS]: '#FACC15',
  [BugStatus.RESOLVED]: '#4ADE80',
  [BugStatus.CLOSED]: '#94A3B8',
};

export const StatsVisualizer: React.FC<StatsVisualizerProps> = ({ bugs }) => {
  const priorityData = Object.values(BugPriority).map(p => ({
    name: p,
    count: bugs.filter(b => b.priority === p).length,
    fill: COLORS[p]
  }));

  const statusData = Object.values(BugStatus).map(s => ({
    name: s,
    value: bugs.filter(b => b.status === s).length
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Priority Distribution */}
      <div className="bg-[#141414] border border-[#2A2A2A] p-6">
        <h3 className="font-serif italic text-xs text-[#666] uppercase tracking-[0.2em] mb-6">
          Priority Distribution
        </h3>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#444" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                stroke="#444" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', fontSize: '12px' }}
                itemStyle={{ color: '#E4E3E0' }}
              />
              <Bar dataKey="count" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-[#141414] border border-[#2A2A2A] p-6">
        <h3 className="font-serif italic text-xs text-[#666] uppercase tracking-[0.2em] mb-6">
          Status Breakdown
        </h3>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as BugStatus]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', fontSize: '12px' }}
                itemStyle={{ color: '#E4E3E0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

