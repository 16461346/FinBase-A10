import { Eye } from "lucide-react";
import React, { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { format, parseISO } from "date-fns";
import NotFound from "../Components/NotFound";

const MyTransaction = () => {
  const data = useLoaderData();
  const { user } = use(AuthContext);

  const userEmail = user.email;
  const myData = data.filter((i) => i.email === userEmail);

  const formatDate = (isoDate) => {
    return format(parseISO(isoDate), "dd MMM yyyy");
  };
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="overflow-x-auto container mx-auto bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold ">
            Total Transactions{" "}
            <span className="text-[#00d4c3]">({myData.length})</span>
          </h2>
          <h2>Total Income : $10000</h2>
          <h2>Total Expense : $ 2000</h2>
        </div>
        <div className="pr-18">
          <select
            defaultValue="Pick a text editor"
            className="select w-40 select-primary"
          >
            <option defaultValue={"Sorted By:"} selected>
              Select-Sort
            </option>
            <option>High-Low</option>
            <option>Low-High</option>
          </select>
        </div>
      </div>

      <table className="table w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                <NotFound />
              </td>
            </tr>
          ) : (
            myData.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td
                  className={`font-semibold ${
                    item.type.toLowerCase() === "expense"
                      ? "text-pink-500"
                      : "text-[#03a799]"
                  }`}
                >
                  {capitalize(item.type)}
                </td>

                <td>{capitalize(item.category)}</td>
                <td
                  className={`font-semibold ${
                    item.type.toLowerCase() === "expense"
                      ? "text-pink-500"
                      : "text-[#03a799]"
                  }`}
                >
                  {item.type.toLowerCase() === "expense" ? "-" : "+"}$
                  {item.amount}
                </td>
                <td>{formatDate(item.date)}</td>
                <td className="text-center">
                  <button className="btn-custom">
                    <Eye size={16} /> View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyTransaction;
