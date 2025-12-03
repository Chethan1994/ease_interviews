import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UserProgress } from '../types';

interface StatsChartProps {
  progress: UserProgress;
  totalQuestions: number;
}

export const StatsChart: React.FC<StatsChartProps> = ({ progress, totalQuestions }) => {
  const mastered = progress.masteredIds.length;
  const inProgress = progress.reviewedIds.filter(id => !progress.masteredIds.includes(id)).length;
  const remaining = Math.max(0, totalQuestions - mastered - inProgress);

  const data = [
    { name: 'Mastered', value: mastered, color: '#22c55e' }, // green-500
    { name: 'In Progress', value: inProgress, color: '#eab308' }, // yellow-500
    { name: 'To Learn', value: remaining, color: '#cbd5e1' }, // slate-300
  ];

  const completionRate = Math.round((mastered / totalQuestions) * 100) || 0;

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">Progress Overview</h3>
        <p className="text-sm text-slate-500">Your mastery journey</p>
      </div>
      
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
              itemStyle={{ fontSize: '14px', fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '24px', fontSize: '14px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Absolute Centered Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-8">
          <div className="text-4xl font-extrabold text-slate-900 leading-none">
            {completionRate}%
          </div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">
            Complete
          </div>
        </div>
      </div>
    </div>
  );
};