import React from 'react';

const DashCard = ({ title, subtitle1, subtitle2, quantity1, quantity2, buttonText, color, hovercolor, colortext }) => {
  const containerStyle = {
    backgroundColor: color,
  };

  return (
    <div className="bg-white shadow rounded-[20px] p-3" style={containerStyle}>
      <div className="flex justify-between">
        <p className={`${colortext} text-lg text-center font-bold`}>{title}</p>
      </div>
      <div className={`flex justify-center ${color} hover:${hovercolor} py-2 -mx-3 my-4`}>
        <p className="text-white text-lg text-center font-bold">{subtitle1} {quantity1}</p>
      </div>
      <div className={`flex justify-center ${color} hover:${hovercolor} py-2 -mx-3 my-4`}>
        <p className="text-white text-lg text-center font-bold">{subtitle2} {quantity2}</p>
      </div>
    </div>
  );
};

export default DashCard;
