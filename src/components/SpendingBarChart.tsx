import type { SpendingPoint } from '../types'

interface SpendingBarChartProps {
  data: SpendingPoint[]
  maxValue?: number
}

export function SpendingBarChart({ data, maxValue = 600 }: SpendingBarChartProps) {
  const chartHeight = 200
  const barWidth = 16
  const gap = 28
  const startX = 48

  return (
    <div className="relative rounded-[20px] bg-white p-4 shadow-card-soft">
      <p className="mb-4 text-sm font-medium text-slate-800">Monthly Spending</p>
      <svg width="100%" height={chartHeight + 40} viewBox={`0 0 327 ${chartHeight + 40}`}>
        {[0, 100, 200, 300, 400, 500, 600].map((tick) => {
          const y = chartHeight - (tick / maxValue) * chartHeight + 10
          return (
            <g key={tick}>
              <line x1={42} y1={y} x2={310} y2={y} stroke="#E8E8E8" strokeWidth="1" />
              <text x={6} y={y + 4} fill="#979797" fontSize="10">
                {tick}
              </text>
            </g>
          )
        })}
        {data.map((point, i) => {
          const barHeight = (point.amount / maxValue) * chartHeight
          const x = startX + i * (barWidth + gap)
          const y = chartHeight - barHeight + 10
          return (
            <g key={point.month}>
              <defs>
                <linearGradient id={`bar-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4D8DF6" />
                  <stop offset="100%" stopColor="#6C4BF4" />
                </linearGradient>
              </defs>
              <rect x={x} y={y} width={barWidth} height={barHeight} rx={4} fill={`url(#bar-${i})`} />
              <text x={x + 2} y={chartHeight + 28} fill="#979797" fontSize="10">
                {point.month}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
