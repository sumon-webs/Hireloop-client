import React from "react";
import { Card } from "@heroui/react";

export const StatCard = ({ icon: Icon, label, value, className = "" }) => {
  return (
    <Card
      className={`w-full  bg-[#18181b] border border-neutral-800 rounded-2xl shadow-sm transition-all duration-200 hover:border-neutral-700 ${className}`}
    >
      {/* In HeroUI v3, CardBody is now Card.Content */}
      <Card.Content className="p-6 flex flex-col gap-4">
        {/* Icon Wrapper */}
        {Icon && (
          <div className="w-10 h-10 flex items-center justify-center bg-neutral-800/60 text-neutral-400 rounded-xl border border-neutral-700/30">
            <Icon size={20} className="stroke-[1.5]" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 tracking-wide">
            {label}
          </span>
          <span className="text-3xl font-semibold text-white tracking-tight">
            {value}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};
