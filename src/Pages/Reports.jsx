import React, { use } from "react";
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
import { AuthContext } from "../Context/AuthContext";

const Reports = () => {
    const{user}=use(AuthContext);


    fetch(`http://localhost:3000/report-page?email=${user.email}`)
    .then(res=>res.json())
    .then(resulst=>{
        console.log(resulst)
    })
    .catch(err=>{
        console.log(err)
    })



  const COLORS = ["#0088FE","#ab265d", "#f50202", "#00C49F", "#FFBB28", "#FF8042"];

  // Static Demo Data
  const categoryData = [
    { name: "Food", value: 1200 },
    { name: "Transport", value: 800 },
    { name: "Shopping", value: 1500 },
    { name: "Bills", value: 600 },
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
    {name : "expense", value:1200},
  ];

  const monthlyData = [
    { month: "Jan", income: 3000, expense: 1800, total: 1200 },
    { month: "Feb", income: 2500, expense: 1600, total: 900 },
    { month: "Mar", income: 3200, expense: 1400, total: 1800 },
    { month: "Apr", income: 2800, expense: 1500, total: 1300 },
    { month: "May", income: 3500, expense: 1800, total: 1700 },
    { month: "Jun", income: 4000, expense: 1900, total: -2100 },
  ];

  const totalIncome = 9000;
  const totalExpense = 5200;
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-5 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">📊 Reports Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-2xl p-5 text-center hover:shadow-md transition">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-2xl font-semibold text-green-600">{totalIncome.toLocaleString()} ৳</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center hover:shadow-md transition">
          <p className="text-sm text-gray-500">Total Expense</p>
          <p className="text-2xl font-semibold text-red-500">{totalExpense.toLocaleString()} ৳</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center hover:shadow-md transition">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-2xl font-semibold text-blue-600">{balance.toLocaleString()} ৳</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
          <h2 className="font-semibold mb-2 text-gray-700">Expense by Category</h2>
          <div style={{ width: "120%", height: 600 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <h2 className="font-semibold mb-2 text-gray-700">Monthly Income, Expense & Total</h2>
          <div style={{ width: "100%", height: 420 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
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
