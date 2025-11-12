import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TbCurrencyTaka } from "react-icons/tb";

const OverViewPie = ({ myData }) => {
  const data = myData || [];

  // হিসাব
  const totalIncome = data
    .filter((item) => item.type === "Income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = data
    .filter((item) => item.type === "Expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const hasData = totalIncome > 0 || totalExpense > 0;

  // Pie Chart data (যদি ডেটা না থাকে তাহলে default ভাবে সমান ভাগ)
  const chartData = hasData
    ? [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense },
        { name: "Balance", value: balance },
      ]
    : [
        { name: "Income", value: 1 },
        { name: "Expense", value: 1 },
        { name: "Balance", value: 1 },
      ];

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"]; // Green, Red, Blue

  return (
    <div className="w-full p-3 sm:p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        Finance Overview
      </h2>

      <div className="w-full h-[300px] sm:h-[400px] md:h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={
                window.innerWidth < 640
                  ? 90
                  : window.innerWidth < 1024
                  ? 130
                  : 220
              }
              innerRadius={
                window.innerWidth < 640
                  ? 50
                  : window.innerWidth < 1024
                  ? 70
                  : 100
              }
              fill="#8884d8"
              label={({ name, value }) =>
                hasData ? `${name}: ${value}৳` : `${name}: 0৳`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                hasData ? [`${value} ৳`, "Amount"] : [`0 ৳`, "Amount"]
              }
            />
            <Legend
              wrapperStyle={{
                fontSize: window.innerWidth < 640 ? "12px" : "14px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverViewPie;
