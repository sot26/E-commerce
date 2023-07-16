import React from "react";

const InfoBox = ({ className, title, icon, count, iconClassName }) => {
  return (
    <div className="w-[200px]  max-w-full shadow-lg">
      <div className={className}>
        <p className="text-xl font-semibold">{title}</p>
        <div className="flex justify-between text-xl mt-3">
          <p>{count}</p>
          <p className={iconClassName}>{icon}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
