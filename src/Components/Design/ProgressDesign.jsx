import { Tooltip } from "antd";
import React from "react";

const ProgressDesign = ({
  progressTitle,
  progressPercent = 0,
  progressPercentDone = 0,
  progressPercentFailed = 0,
  progressColor,
  progressDoneColor,
  progressSize,
  progressWidth,
  progressFailedColor,
  progressTotal,
}) => {
  const radius = progressSize / 2 - 10;
  const circumference = 2 * Math.PI * radius;

  const segments = [];

  if (progressPercentFailed > 0) {
    segments.push({
      color: progressFailedColor,
      proportion: progressPercentFailed / progressTotal,
    });
  }

  if (progressPercent > 0) {
    segments.push({
      color: progressColor,
      proportion: progressPercent / progressTotal,
    });
  }

  if (progressPercentDone > 0) {
    segments.push({
      color: progressDoneColor,
      proportion: progressPercentDone / progressTotal,
    });
  }

  let offset = 0;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: progressSize, height: progressSize }}
    >
      <svg
        width={progressSize}
        height={progressSize}
        className="rotate-[-90deg]"
      >
        <circle
          cx={progressSize / 2}
          cy={progressSize / 2}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={progressWidth}
          fill="none"
        />
        {segments.map((segment, index) => {
          const length = circumference * segment.proportion;
          const dashArray = `${length} ${circumference}`;
          const circle = (
            <circle
              key={index}
              cx={progressSize / 2}
              cy={progressSize / 2}
              r={radius}
              stroke={segment.color}
              strokeWidth={progressWidth}
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
      <div className="absolute text-center">
        <p className="text-[2.5rem] font-medium text-[#4D4D4D]">
          {progressTotal}
        </p>
      </div>
      <Tooltip title={progressTitle}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto" />
      </Tooltip>
    </div>
  );
};

export default ProgressDesign;
