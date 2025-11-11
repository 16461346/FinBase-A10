import { FaChevronDown } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { useLoaderData } from "react-router";

const TransactionDetails = () => {
  const da = useLoaderData();
  const data = da.result;

  const { type, date, category, email, name, amount, description } = data;

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="max-w-xl mx-auto w-5/6 shadow-md rounded-2xl p-6 my-10 border">
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
        Transaction Details
      </h2>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-bold text-[1rem]">Transaction Type :</span>{" "}
          <span
            className={`font-semibold ${
              type.toLowerCase() === "expense"
                ? "text-pink-500"
                : "text-[#03a799]"
            }`}
          >
            {type}
          </span>
        </p>
        <p>
          <span className="font-bold text-[1rem]">Transaction Category :</span>{" "}
          {category}
        </p>
        <p className="flex items-center gap-1">
          <span className="font-bold text-[1rem]">Transaction Amount :</span>
          <span className="flex font-bold text-pink-500 items-center gap-0">
            {amount} <TbCurrencyTaka size={20} />
          </span>
        </p>

        <p>
          <span className="font-bold text-[1rem]">User Name :</span> {name}
        </p>
        <p>
          <span className="font-bold text-[1rem]">User Email:</span>{" "}
          <a href="#" className="text-blue-600">
            {email}
          </a>
        </p>
        <p>
          <span className="font-bold text-[1rem]">Transaction Date :</span>{" "}
          {formatDate(date)}
        </p>
        <p className="whitespace-normal break-words">
          <span className="font-bold text-[1rem]">Description :</span>{" "}
          <span className=""> {description}</span>
        </p>
      </div>

      <div className="mt-6 border-t gap-4 flex pt-3">
        <button className="inline-block bg-[#3ed7c9] hover:bg-[#000000] hover:text-white text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105">Update</button>
        <button className="inline-block hover:bg-[#000000] bg-purple-400 hover:text-white text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105">Delete</button>
      </div>
    </div>
  );
};

export default TransactionDetails;
