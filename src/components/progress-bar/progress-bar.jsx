import React from "react";

const ProgressBar = ({ progress, max }) => {
  const progressBarStyle = {
    width: `${(progress / max) * 100}%`,
    backgroundColor: "#87BB42",
    height: "20px",
    borderRadius: "10px",
  };

  return (
    <div className="rating border border-[#6361611a] w-[80%] h-[8px] rounded-full relative overflow-hidden flex items-center">
      <span style={progressBarStyle}></span>
    </div>
  );
};

export default ProgressBar;
