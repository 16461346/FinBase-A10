import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State
  const [type, setType] = useState("");
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
  const today = new Date().toISOString().split("T")[0];

  const categories =
    type === "Income"
      ? incomeCategories
      : type === "Expense"
      ? expenseCategories
      : [];

const handleAdd = async (e) => {
  e.preventDefault();
  const E = e.target;

  const inputDate = E.date.value;
  const [year, month, day] = inputDate.split("-").map(Number);
  const dateUTC = new Date(Date.UTC(year, month - 1, day));

  
  const amount = Number(E.amount.value);
  if (isNaN(amount) || amount < 0) {
    return toast.error("Please enter a valid amount");
  }

  const formData = {
    type,
    date: dateUTC,
    category: E.category.value,
    email: user?.email,
    name: user?.displayName,
    amount: amount,
    description: E.description.value,
  };

  try {
    const res = await fetch(`http://localhost:3000/transactions`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
         `Bearer ${user.accessToken}`
       },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Transaction added successfully");
      navigate("/my-transaction");
    } else {
      toast.error("Failed to add transaction");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error!");
  }
};


  return (
    <div
      className="card w-[350px] md:w-[520px] h-auto mt-10 mb-20 mx-auto 
      bg-gradient-to-r from-cyan-200 to-purple-300  
      p-6 rounded-xl shadow-2xl"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl text-black font-bold text-center mb-4">
        Add Your Transaction
      </h2>

      <form className="space-y-4" onSubmit={handleAdd}>
        {/* Transaction Type & Amount */}
        <div className="flex gap-4">
          <div className="w-2/3">
            <label className="label">
              <span className="label-text text-black text-[15px]">
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
              className="input h-6 sm:h-7 md:h-10 text-[12px] w-full  md:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
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
              <span className="label-text text-black text-[15px]">Amount</span>
            </label>
            <input
              required
              name="amount"
              type="number"
              min={0}
              placeholder="Enter amount"
              className="input h-6 sm:h-7 md:h-10 text-[12px] p-2 md:text-sm w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        {/* Date & Category */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label">
              <span className="label-text text-black text-[15px]">Date</span>
            </label>
            <input
              required
              name="date"
              type="date"
              defaultValue={today}
              className="input h-6 sm:h-7 md:h-10 text-[12px] p-2 md:text-sm w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="w-1/2">
            <label className="label">
              <span className="label-text text-black text-[15px]">
                Category
              </span>
            </label>
            <select
              required
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input h-6 sm:h-7 md:h-10 text-[12px]  md:text-sm w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
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
            <span className="label-text text-black text-[15px]">
              User Email
            </span>
          </label>
          <input
            readOnly
            name="email"
            type="text"
            value={user?.email || ""}
            className="input h-6 sm:h-7 md:h-10 text-[12px] p-2 md:text-sm w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text text-black text-[15px]">User Name</span>
          </label>
          <input
            readOnly
            name="name"
            type="text"
            value={user?.displayName || ""}
            className="input h-6 sm:h-7 md:h-10 text-[12px] p-2 md:text-sm w-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text text-black text-[15px]">
              Description
            </span>
          </label>
          <textarea
            required
            name="description"
            placeholder="Enter description"
            rows={6} // শুরুতে 3 লাইন উচ্চতা
            className="input  h-16 md:h-20 lg:h-22 w-full text-[13px] md:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none overflow-hidden break-words whitespace-normal"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-400 hover:bg-purple-400 text-black font-semibold hover:text-white py-2 px-6 text-[16px] md:text-[20px] rounded-lg transition-all duration-300 hover:scale-102"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
