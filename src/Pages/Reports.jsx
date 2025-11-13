import React, { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TbReport } from "react-icons/tb";
import { AuthContext } from "../Context/AuthContext";

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const COLORS = [
    "#0088FE",
    "#ab265d",
    "#f50202",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/report-page?email=${user.email}`)
      .then((res) => res.json())
      .then((result) => {
        if (!result || !Array.isArray(result)) return;

        const totals = result.reduce((acc, current) => {
          acc[current.category] =
            (acc[current.category] || 0) + Number(current.amount);
          return acc;
        }, {});

        const catData = Object.keys(totals).map((key) => ({
          name: key,
          value: totals[key],
        }));
        setCategoryData(catData);

        // Monthly totals
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthTotals = months.map((month, index) => {
          const monthTrans = result.filter(
            (t) => new Date(t.date).getMonth() === index
          );
          const income = monthTrans
            .filter((t) => t.type === "Income")
            .reduce((s, t) => s + Number(t.amount), 0);
          const expense = monthTrans
            .filter((t) => t.type === "Expense")
            .reduce((s, t) => s + Number(t.amount), 0);
          return { month, income, expense, total: income - expense };
        });
        setMonthlyData(monthTotals);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const totalIncome = monthlyData.reduce((s, m) => s + m.income, 0);
  const totalExpense = monthlyData.reduce((s, m) => s + m.expense, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className=" md:p-8 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="md:text-3xl lg:4xl justify-center md:my-0 md:mb-10 mt-8  flex items-center text-2xl font-bold mb-4 text-gray-700">
        <TbReport></TbReport>
        Transaction Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid  grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-2xl p-5 text-center hover:shadow-md transition">
          <p className="text-xl md:text-3xl lg:text-3xl text-gray-500">Total Income</p>
          <p className="text-2xl md:text-2xl lg:text-3xl font-semibold text-green-600">
            {totalIncome.toLocaleString()} ৳
          </p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center hover:shadow-md transition">
          <p className="text-xl md:text-3xl lg:text-3xl text-gray-500">Total Expense</p>
          <p className="text-2xl md:text-2xl lg:text-3xl font-semibold text-red-500">
            {totalExpense.toLocaleString()} ৳
          </p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center hover:shadow-md transition">
          <p className="text-xl md:text-3xl lg:text-3xl text-gray-500">Balance</p>
          <p className="text-2xl md:text-2xl lg:text-3xl font-semibold text-blue-600">
            {balance.toLocaleString()} ৳
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
          <h2 className="font-semibold md:text-2xl text-xl text-center mb-2 text-gray-700">
            Income and Expenses by Category
          </h2>
          <div className="w-full  h-[250px] sm:h-[350px] md:h-[380px] lg:h-[400px]">
            <ResponsiveContainer
              className={"text-[10px] md:text-[16px]"}
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  className={` outerRadius={120}`}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
          <h2 className="font-semibold mb-2 md:text-2xl  text-xl  text-center text-gray-700">
            Monthly Income, Expense & Total
          </h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                className="text-sm"
                margin={{ top: 40, right: 15, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#16a34a" name="Income" />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" />
                <Bar dataKey="total" fill="#3b82f6" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
