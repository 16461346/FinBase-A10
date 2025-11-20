import React, { useContext, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

        const res = await fetch(
          "https://fin-ease-a10-server.vercel.app/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const userTransactions = data.filter(
          (item) => item.email === user.email
        );

        const totalIncome = userTransactions
          .filter((item) => item.type.toLowerCase() === "income")
          .reduce((acc, item) => acc + Number(item.amount), 0);

        const totalExpense = userTransactions
          .filter((item) => item.type.toLowerCase() === "expense")
          .reduce((acc, item) => acc + Number(item.amount), 0);

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
                { name: "Income", value: 0 },
                { name: "Expense", value: 0 },
                { name: "Balance", value: 0 },
              ]
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [user]);

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

  // 🟢 IMPORTANT FIX: Only PieChart values stay positive
  const displayData = chartData.map((item) => ({
    ...item,
    value: Math.abs(item.value) === 0 ? 1 : Math.abs(item.value),
  }));

  return (
    <div className="w-full container mx-auto mt-10 p-3 sm:p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
        Finance Overview
      </h2>

      <div className="w-full text-[12px] md:text-xl h-[300px] sm:h-[400px] md:h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
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
              label={({ name }) =>
                `${name}: ${
                  chartData.find((x) => x.name === name)?.value
                }৳`
              }
            >
              {displayData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => {
                const realValue =
                  chartData.find((x) => x.name === name)?.value || 0;
                return [`${realValue} ৳`, "Amount"];
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverViewPie;
