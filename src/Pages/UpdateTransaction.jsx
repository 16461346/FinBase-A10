import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import Loadding from "../Components/Loadding";
import ErrorPage from "../Components/ErrorPage";

const UpdateTransactionForm = () => {
  const { user } = useContext(AuthContext);
  const params = useParams(); 
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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

  const formatDateForInput = (isoString) => {
    const d = new Date(isoString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!user) return;
    const fetchTransaction = async () => {
      try {
        const token = await user.getIdToken();

        const res = await fetch(
          `https://fin-ease-a10-server.vercel.app/transactions/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch transaction");

        const data = await res.json();
        if (!data.result) throw new Error("Transaction not found");

        setTransaction(data.result);
        setAmount(data.result.amount);
        setType(data.result.type);
        setCategory(data.result.category);
        setDate(formatDateForInput(data.result.date));
        setDescription(data.result.description);
        setEmail(data.result.email);
        setName(data.result.name);

        setLoading(false);
      } catch (err) {
        //.error(err);
        setError(err.message || "Something went wrong!");
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [user, params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User not authenticated!");

    try {
      const token = await user.getIdToken();

      const formData = {
        type,
        amount: parseFloat(amount),
        category,
        date: new Date(date + "T00:00:00Z").toISOString(),
        description,
      };

      const res = await fetch(
        `https://fin-ease-a10-server.vercel.app/transactions/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success("Transaction updated successfully!");
        navigate("/my-transaction");
      } else {
        toast.error("Failed to update transaction!");
      }
    } catch (err) {
      //.error(err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <Loadding/>;
  if (error) return <ErrorPage/>;

  return (
    <div className="card w-[350px] md:w-[520px] mt-10 mb-20 mx-auto bg-gradient-to-r from-cyan-200 to-purple-300 p-6 rounded-xl shadow-2xl">
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
                setCategory("");
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

        {/* Date & Category */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label">
              <span className="label-text text-black text-[15px]">Date</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input h-10 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="w-1/2">
            <label className="label">
              <span className="label-text text-black text-[15px]">Category</span>
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
            <span className="label-text text-black text-[15px]">User Email</span>
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
            <span className="label-text text-black text-[15px]">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="input h-16 md:h-20 lg:h-22 w-full text-[13px] md:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
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
