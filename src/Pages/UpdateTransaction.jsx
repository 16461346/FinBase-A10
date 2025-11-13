import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdateTransactionForm = () => {
  const da = useLoaderData();
  const data = da.result;
  const formatDateForInput = (isoString) => {
    const d = new Date(isoString);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0"); // 0-based month
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const {
    _id,
    amount: defaultAmount,
    email,
    name,
    description: defaultDescription,
    date: defaultDate,
    category: defaultCategory,
    type: defaultType,
  } = data;

  // Controlled States
  const [amount, setAmount] = useState(defaultAmount);
  const [type, setType] = useState(defaultType);
  const [category, setCategory] = useState(defaultCategory);
  const [date, setDate] = useState(formatDateForInput(defaultDate));
  const [description, setDescription] = useState(defaultDescription);
  const navigate = useNavigate();

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Input থেকে date নিয়ে ISO string এ convert করা
    const isoDate = new Date(date + "T00:00:00Z").toISOString();

    const formData = {
      type,
      amount: parseFloat(amount),
      category,
      date: isoDate,
      description,
    };

    try {
      const res = await fetch(`http://localhost:3000/transactions/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Transaction updated successfully!");
        navigate("/my-transaction");
      } else {
        toast.error("Failed to update transaction!");
      }

      console.log(result);
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div
      className="card w-[350px] md:w-[520px] mt-10 mb-20 mx-auto 
      bg-gradient-to-r from-cyan-200 to-purple-300 p-6 rounded-xl shadow-2xl"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl text-black font-bold text-center mb-6">
        Update Transaction
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Type & Amount */}
        <div className="flex gap-4">
          <div className="w-2/3">
            <label className="label">
              <span className="label-text text-black text-[15px]">
                Transaction Type
              </span>
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCategory(""); // Reset category when type changes
              }}
              className="input h-10 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input h-10 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label">
              <span className="label-text text-black text-[15px]">Date</span>
            </label>
            <input
              type="date"
              defaultValue={date}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input h-10 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input h-10 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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

        {/* Email & Name */}
        <div>
          <label className="label">
            <span className="label-text text-black text-[15px]">
              User Email
            </span>
          </label>
          <input
            type="text"
            value={email}
            readOnly
            className="input h-10 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text text-black text-[15px]">User Name</span>
          </label>
          <input
            type="text"
            value={name}
            readOnly
            className="input h-10 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="input  h-16 md:h-20 lg:h-22 w-full text-[13px] md:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none overflow-hidden break-words whitespace-normal"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-400 hover:bg-purple-400 text-black font-semibold hover:text-white py-2 md:py-3 text-[16px] md:text-[18px] rounded-lg transition-all duration-300 hover:scale-101"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransactionForm;
