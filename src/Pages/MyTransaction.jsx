import { Eye } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { format, parseISO } from "date-fns";
import NotFound from "../Components/NotFound";
import { TbCurrencyTaka } from "react-icons/tb";
import Loadding from "../Components/Loadding";

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [myData, setMyData] = useState([]);
  const [typeData, setTypeData] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  const formatDate = (isoDate) => format(parseISO(isoDate), "dd MMM yyyy");
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // 🔹 Fetch transactions from server
  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch(
          "https://fin-ease-a10-server.vercel.app/transactions",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        const transactions = Array.isArray(data) ? data : data.result || [];
        const filtered = transactions.filter((i) => i.email === user.email);
        setMyData(filtered);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setMyData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  // 🔹 Filter and Search
  const filteredData = myData
    .filter((item) =>
      filterType
        ? item.type.toLowerCase().includes(filterType.toLowerCase())
        : true
    )
    .filter((item) =>
      typeData
        ? item.category.toLowerCase().includes(typeData.toLowerCase().trim())
        : true
    );

  const totalIncome = filteredData
    .filter((item) => item.type.toLowerCase() === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = filteredData
    .filter((item) => item.type.toLowerCase() === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // 🔹 Show loader when fetching or filtering

  return (
    <div className="container mx-auto px-3 md:px-6 py-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-lg md:text-2xl font-semibold">
          All Transactions{" "}
          <span className="text-[#00d4c3]">({filteredData.length})</span>
        </h2>
      </div>

      <div className="flex container mx-auto items-center sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <div>
          <h2 className="flex text-xs  sm:text-sm md:text-base items-center">
            <span className="font-semibold">Total Income: </span>{" "}
            <span className="text-[#03a799] font-bold pl-2">{totalIncome}</span>
            <TbCurrencyTaka />
          </h2>

          <h2 className="flex text-xs sm:text-sm md:text-base items-center">
            <span className="font-semibold">Total Expense:</span>
            <span className="text-pink-500 pl-2 font-bold">{totalExpense}</span>
            <TbCurrencyTaka />
          </h2>
        </div>

        <div className="flex gap-0 md:gap-4 lg:gap-6 md:mr-16 items-center">
          <input
            type="search"
            placeholder="Search by category"
            value={typeData}
            onChange={(e) => setTypeData(e.target.value)}
            className="border rounded px-2 py-1 text-[14px] md:text-sm md:w-54 w-30 sm:w-36 h-6 md:h-9"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-[14px] md:text-sm rounded-xl sm:select-sm md:select-md w-12 sm:w-36 md:w-20 h-6 md:h-9 border border-gray-300 focus:outline-none"
          >
            <option className="text-black" value="">
              All
            </option>
            <option className="text-black" value="expense">
              Expense
            </option>
            <option className="text-black" value="income">
              Income
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md p-2 sm:p-3 md:p-4">
        <table className="border-separate border-spacing-y-4 min-w-full table-auto text-[14px] sm:text-sm md:text-base">
          <thead className="text-gray-500">
            <tr>
              <th className="whitespace-nowrap px-2 py-2 text-left">Type</th>
              <th className="whitespace-nowrap px-2 py-2 text-left">
                Category
              </th>
              <th className="whitespace-nowrap px-2 py-2 text-left">Amount</th>
              <th className="whitespace-nowrap px-2 py-2 text-left">Date</th>
              <th className="whitespace-nowrap px-2 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  <Loadding />
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-[14px] sm:text-sm md:text-base"
                >
                  <NotFound />
                </td>
              </tr>
            ) : (
              filteredData.map((item, i) => (
                <tr
                  key={i}
                  className="mt-10 transition-all duration-300 transform hover:scale-101 hover:shadow-lg cursor-pointer"
                >
                  <td
                    className={`font-semibold ${
                      item.type.toLowerCase() === "expense"
                        ? "text-pink-500"
                        : "text-[#03a799]"
                    } text-[14px] sm:text-sm md:text-base px-2 py-1`}
                  >
                    {capitalize(item.type)}
                  </td>

                  <td className="text-[14px] sm:text-sm md:text-base px-2 py-1">
                    {capitalize(item.category)}
                  </td>

                  <td
                    className={`font-semibold ${
                      item.type.toLowerCase() === "expense"
                        ? "text-pink-500"
                        : "text-[#03a799]"
                    } text-[14px] sm:text-sm md:text-base px-2 py-1`}
                  >
                    <div className="flex items-center">
                      {item.type.toLowerCase() === "expense" ? "-" : "+"}
                      {item.amount}
                    </div>
                  </td>

                  <td className="text-[10px] sm:text-sm md:text-base px-2 py-1">
                    {formatDate(item.date)}
                  </td>

                  <td className="text-center px-2 py-1">
                    <NavLink
                      to={`/transaction-details/${item._id}`}
                      className="inline-flex items-center gap-1 bg-teal-400 hover:bg-purple-400 text-black hover:text-white px-2 py-1 rounded-md text-[14px] sm:text-sm md:text-base font-medium transition-all duration-300"
                    >
                      <Eye size={15} /> View
                    </NavLink>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTransaction;
