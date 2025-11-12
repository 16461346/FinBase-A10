import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TbCurrencyTaka } from "react-icons/tb";

const OverViewPie = ({ myData }) => {
  const data = myData;

  // হিসাব
  const totalIncome = data
    .filter((item) => item.type === "Income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = data
    .filter((item) => item.type === "Expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = totalIncome - totalExpense;

  // Pie Chart data
  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
    { name: "Balance", value: balance },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"]; // Green, Red, Blue

  return (
    <div className="w-full h-[480px] md:h-[600px] p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Finance Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={200}
            innerRadius={100}  
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}৳`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} ৳`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverViewPie;
