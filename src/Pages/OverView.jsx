import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AuthContext } from "../Context/AuthContext";

const OverViewPie = () => {
  const { user } = useContext(AuthContext);
  const [chartData, setChartData] = useState([
    { name: "Income", value: 1 },
    { name: "Expense", value: 1 },
    { name: "Balance", value: 1 },
  ]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken(); 

        const res = await fetch("http://localhost:3000/transactions", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        const data = await res.json();

        const totalIncome = data
          .filter((item) => item.type === "Income")
          .reduce((acc, item) => acc + item.amount, 0);

        const totalExpense = data
          .filter((item) => item.type === "Expense")
          .reduce((acc, item) => acc + item.amount, 0);

        const balance = totalIncome - totalExpense;

        const hasData = totalIncome > 0 || totalExpense > 0;

        setChartData(
          hasData
            ? [
                { name: "Income", value: totalIncome },
                { name: "Expense", value: totalExpense },
                { name: "Balance", value: balance },
              ]
            : [
                { name: "Income", value: 1 },
                { name: "Expense", value: 1 },
                { name: "Balance", value: 1 },
              ]
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [user]);

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"]; // Green, Red, Blue
  const hasData = chartData.some((d) => d.value > 1);

  return (
    <div className="w-full container mx-auto mt-10 p-3 sm:p-4 md:p-6 bg-white rounded-2xl shadow-xl">
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
              outerRadius={window.innerWidth < 640 ? 90 : window.innerWidth < 1024 ? 130 : 220}
              innerRadius={window.innerWidth < 640 ? 50 : window.innerWidth < 1024 ? 70 : 100}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}৳`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} ৳`, "Amount"]} />
            <Legend wrapperStyle={{ fontSize: window.innerWidth < 640 ? "12px" : "14px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverViewPie;
