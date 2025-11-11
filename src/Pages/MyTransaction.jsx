import { Eye } from "lucide-react";
import React, { useContext } from "react";
import { NavLink, useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { format, parseISO } from "date-fns";
import NotFound from "../Components/NotFound";
import { TbCurrencyTaka } from "react-icons/tb";

const MyTransaction = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const userEmail = user?.email;
  const myData = data.filter((i) => i.email === userEmail);

  const formatDate = (isoDate) => {
    return format(parseISO(isoDate), "dd MMM yyyy");
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <div className="container mx-auto px-3 md:px-6 py-6">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-lg md:text-2xl font-semibold">
          All Transactions{" "}
          <span className="text-[#00d4c3]">({myData.length})</span>
        </h2>
      </div>
      <div className="flex container mx-auto items-center sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <div>
          <h2 className="flex text-xs sm:text-sm md:text-base items-center">
            <span className="font-semibold">Total Income: </span> 10000
            <TbCurrencyTaka />
          </h2>

          <h2 className="flex text-xs sm:text-sm md:text-base items-center">
            <span className="font-semibold">Total Expense:</span> 10000
            <TbCurrencyTaka />
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <label className="input text-[14px] md:text-sm md:w-54 w-30  sm:w-36  h-6 md:h-9 border-1 ">
            <svg
              className="h-[.7em] md:h-[1rem] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
          <select className=" text-[14px] md:text-sm rounded-xl sm:select-sm md:select-md w-12 sm:w-36 md:w-20 h-6 md:h-9 border border-gray-300 focus:outline-none">
            <option value="" disabled selected>
              Filter
            </option>
            <option>Expense</option>
            <option>Income</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
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
            {myData.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-[14px] sm:text-sm md:text-base"
                >
                  <NotFound />
                </td>
              </tr>
            ) : (
              myData.map((item, i) => (
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
                    <div className="flex items-center ">
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
