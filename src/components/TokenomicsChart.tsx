"use client";

import React, { useState } from 'react';

interface TokenomicsData {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  color: string;
  icon: string;
  descriptions: string[];
}

interface TokenomicsChartProps {
  data: TokenomicsData[];
}

const formatAmount = (num: number): string => {
  if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(num % 1_000_000_000_000 === 0 ? 0 : 1)}T`;
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(0)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}M`;
  return num.toLocaleString();
};

// Pure CSS/SVG Donut Chart — no Chart.js dependency
const DonutChart = ({ data, hoveredId, onHover }: { data: TokenomicsData[]; hoveredId: string | null; onHover: (id: string | null) => void }) => {
  const size = 280;
  const strokeWidth = 42;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativePercent = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {data.map((item) => {
          const percent = item.percentage / 100;
          const strokeDash = circumference * percent;
          const strokeGap = circumference - strokeDash;
          const offset = circumference * cumulativePercent;
          const isHovered = hoveredId === item.id;
          cumulativePercent += percent;

          return (
            <circle
              key={item.id}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={isHovered ? strokeWidth + 8 : strokeWidth}
              strokeDasharray={`${strokeDash} ${strokeGap}`}
              strokeDashoffset={-offset}
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: isHovered ? `drop-shadow(0 0 12px ${item.color}80)` : 'none',
                opacity: hoveredId && !isHovered ? 0.4 : 1,
              }}
              onMouseEnter={() => onHover(item.id)}
              onMouseLeave={() => onHover(null)}
            />
          );
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {hoveredId ? (
            <>
              <div className="text-3xl font-black text-white">
                {data.find(d => d.id === hoveredId)?.percentage}%
              </div>
              <div className="text-xs text-slate-400 mt-1 max-w-[100px] leading-tight">
                {data.find(d => d.id === hoveredId)?.name}
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl font-black bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent">
                5T
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                Total Supply
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const TokenomicsChart: React.FC<TokenomicsChartProps> = ({ data }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Two-column: Chart left, Legend right */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

        {/* Donut Chart */}
        <div className="flex-shrink-0">
          <DonutChart data={data} hoveredId={hoveredId} onHover={setHoveredId} />
        </div>

        {/* Legend Cards */}
        <div className="w-full max-w-md space-y-3">
          {data.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                className={`group relative flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer
                  ${isHovered
                    ? 'border-amber-500/60 bg-white/[0.06] scale-[1.02] shadow-lg'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
                  }`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Color bar accent */}
                <div
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: item.color,
                    opacity: isHovered ? 1 : 0.5,
                    boxShadow: isHovered ? `0 0 8px ${item.color}60` : 'none',
                  }}
                />

                {/* Percentage circle */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all duration-300"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${item.color}, ${item.color}99)`
                      : `${item.color}20`,
                    color: isHovered ? '#fff' : item.color,
                  }}
                >
                  {item.percentage}%
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-slate-300'}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {formatAmount(item.amount)} SATOSHI
                  </p>
                </div>

                {/* Amount badge */}
                <div
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
                    ${isHovered ? 'bg-amber-500/20 text-amber-400' : 'bg-white/[0.04] text-slate-500'}`}
                >
                  {formatAmount(item.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
