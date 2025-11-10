import React, { useState } from "react";

const AddTransaction = () => {
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

  return (
    <div className="card w-[520px] h-auto mt-10 mb-20 mx-auto 
      bg-gradient-to-r from-cyan-200 to-purple-300  
      p-6 rounded-xl shadow-2xl">
      
      <h2 className="text-2xl text-black font-bold text-center mb-4 ">
        Add Your Transaction
      </h2>

      <form className="space-y-4">
        {/* Radio Buttons */}
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="t-type"
              value="Income"
              checked={type === "Income"}
              onChange={(e) => {
                setType(e.target.value);
                setCategory("");
              }}
              className="w-5 h-5 accent-teal-400"
            />
            <span className="text-black">Income</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="t-type"
              value="Expense"
              checked={type === "Expense"}
              onChange={(e) => {
                setType(e.target.value);
                setCategory("");
              }}
              className="w-5 h-5 accent-pink-400"
            />
            <span className="text-black">Expense</span>
          </label>
        </div>

        {/* Date and Category */}
        <div className="flex justify-between gap-4">
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
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
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
            placeholder="User email"
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
            placeholder="User Name"
           className="input w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="label">
            <span className="label-text text-black text-sm">Amount</span>
          </label>
          <input
            required
            name="amount"
            type="number"
            min={0}
            placeholder="Your expense/income amount"
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
          ></textarea>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-teal-400 hover:bg-purple-400 text-black font-semibold hover:text-white py-2 px-6 rounded-lg transition-all duration-300  hover:scale-101">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
