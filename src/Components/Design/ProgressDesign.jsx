/* eslint-disable no-unused-vars */
import { Progress, Tooltip } from "antd";
import React from "react";

const ProgressDesign = ({
  progressTitle,
  progressPercent,
  progressPercentDone,
  progressPercentFailed,
  progressType,
  progressColor,
  progressDoneColor,
  progressSize,
  progressWidth,
  progressFailedColor,
}) => {
  const radius = progressSize / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const successStroke = (progressPercentDone / 1000) * circumference;
  const pendingStroke = (progressPercent / 1000) * circumference;
  const failedStroke = (progressPercentFailed / 1000) * circumference;

  return (
    <div
      className={`relative flex items-center justify-center`}
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
        <circle
          cx={progressSize / 2}
          cy={progressSize / 2}
          r={radius}
          stroke={progressDoneColor}
          strokeWidth={progressWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - successStroke}
        />
        <circle
          cx={progressSize / 2}
          cy={progressSize / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={progressWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - successStroke - pendingStroke}
        />
        {progressPercentFailed > 0 && (
          <circle
            cx={progressSize / 2}
            cy={progressSize / 2}
            r={radius}
            stroke={progressFailedColor}
            strokeWidth={progressWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - successStroke - pendingStroke - failedStroke
            }
          />
        )}
      </svg>
      <div className="absolute text-center">
        <p className="text-[2.5rem] font-medium text-[#4D4D4D]">
          {progressPercentDone + progressPercent + progressPercentFailed}
        </p>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        title={progressTitle}
      ></div>
    </div>
  );
};

export default ProgressDesign;
