import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);

  // State
  const [type, setType] = useState(""); // Income / Expense
  const [category, setCategory] = useState("");

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Vata",
    "Investment",
    "Gift",
    "Allowance",
    "Scholarship",
    "Other",
  ];

  const expenseCategories = [
    "Rent",
    "Health",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Travel",
    "Loan",
    "Savings",
    "Other",
  ];

  const categories =
    type === "Income"
      ? incomeCategories
      : type === "Expense"
      ? expenseCategories
      : [];

  // Form submit handler
  const handleAdd = (e) => {
    e.preventDefault();
    const E = e.target;

    const formData = {
      type, // from state
      date: E.date.value,
      category: E.category.value,
      email: user?.email,
      name: user?.displayName,
      amount: E.amount.value,
      description: E.description.value,
    };
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      toast.success('Trasaction added success')
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card w-[520px] h-auto mt-10 mb-20 mx-auto 
      bg-gradient-to-r from-cyan-200 to-purple-300  
      p-6 rounded-xl shadow-2xl"
    >
      <h2 className="text-2xl text-black font-bold text-center mb-4">
        Add Your Transaction
      </h2>

      <form className="space-y-4" onSubmit={handleAdd}>
        {/* Transaction Type & Amount */}
        <div className="flex gap-4">
          <div className="w-2/3">
            <label className="label">
              <span className="label-text text-black text-sm">
                Transaction Type
              </span>
            </label>
            <select
              required
              name="t_type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCategory(""); // reset category on type change
              }}
              className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="w-1/3">
            <label className="label">
              <span className="label-text text-black text-sm">Amount</span>
            </label>
            <input
              required
              name="amount"
              type="number"
              min={0}
              placeholder="Enter amount"
              className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        {/* Date & Category */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label">
              <span className="label-text text-black text-sm">Date</span>
            </label>
            <input
              required
              name="date"
              type="date"
              className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="w-1/2">
            <label className="label">
              <span className="label-text text-black text-sm">Category</span>
            </label>
            <select
              required
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* User Email & Name */}
        <div>
          <label className="label">
            <span className="label-text text-black text-sm">User Email</span>
          </label>
          <input
            readOnly
            name="email"
            type="text"
            value={user?.email || ""}
            className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text text-black text-sm">User Name</span>
          </label>
          <input
            readOnly
            name="name"
            type="text"
            value={user?.displayName || ""}
            className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text text-black text-sm">Description</span>
          </label>
          <textarea
            required
            name="description"
            placeholder="Enter description"
            className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-400 hover:bg-purple-400 text-black font-semibold hover:text-white py-2 px-6 rounded-lg transition-all duration-300 hover:scale-101"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
