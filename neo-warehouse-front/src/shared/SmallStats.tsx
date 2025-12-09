import React from "react";

type Props = {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
};

export default function SmallStat({ title, value, icon }: Props) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gray-50">{icon}</div>
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}