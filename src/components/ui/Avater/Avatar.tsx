import React from "react";

const AvatarComponent = ({ label, data }: { label: string; data: any }) => {
  return (
    <div className="avatar">
      <div className="w-24 rounded-full"> <img src={data} /></div>
    </div>
  );
};

export default AvatarComponent;
