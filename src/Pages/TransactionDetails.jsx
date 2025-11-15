import { use, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { NavLink, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Loadding from "../Components/Loadding";
import { AuthContext } from "../Context/AuthContext";


const TransactionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const {user}=use(AuthContext)



  useEffect(() => {
    fetch(`http://localhost:3000/transactions/${id}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data.result || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch transaction.",
          icon: "error",
        });
        setLoading(false);
      });
  }, [id]);

  function formatDate(dateString) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleting(true);
        fetch(`http://localhost:3000/transactions/${transaction._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Transaction has been deleted.",
              icon: "success",
            });
            navigate("/my-transaction");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete transaction.",
              icon: "error",
            });
          })
          .finally(() => setDeleting(false));
      }
    });
  };


  if (loading) return <Loadding />;

  return (
    <div className="max-w-xl mx-auto w-5/6 shadow-md rounded-2xl p-6 my-10 border">
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
        Transaction Details
      </h2>

      <div className="space-y-2 text-sm">

        <p>
          <span className="font-bold text-[1rem]">Transaction Type:</span>{" "}
          <span
            className={`font-semibold ${
              transaction.type?.toLowerCase() === "expense"
                ? "text-pink-500"
                : "text-[#03a799]"
            }`}
          >
            {transaction.type || "-"}
          </span>
        </p>

        <p>
          <span className="font-bold text-[1rem]">Transaction Category:</span>{" "}
          {transaction.category || "-"}
        </p>

        <p className="flex items-center gap-1">
          <span className="font-bold text-[1rem]">Transaction Amount:</span>
          <span className="flex font-bold text-pink-500 items-center gap-0">
            {transaction.amount || 0} <TbCurrencyTaka size={20} />
          </span>
        </p>

       
        <p>
          <span className="font-bold text-[1rem]">User Name:</span>{" "}
          {transaction.name || "-"}
        </p>

        <p>
          <span className="font-bold text-[1rem]">User Email:</span>{" "}
          {transaction.email ? (
            <a href={`mailto:${transaction.email}`} className="text-blue-600">
              {transaction.email}
            </a>
          ) : (
            "-"
          )}
        </p>

      
        <p>
          <span className="font-bold text-[1rem]">Transaction Date:</span>{" "}
          {formatDate(transaction.date)}
        </p>

        <p className="whitespace-normal break-words">
          <span className="font-bold text-[1rem]">Description:</span>{" "}
          {transaction.description || "-"}
        </p>
      </div>

      <div className="mt-6 border-t gap-4 flex pt-3">
        <NavLink
          to={`/update-transacion/${transaction._id}`} 
          className="inline-block bg-[#3ed7c9] hover:bg-[#000000] hover:text-white text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105"
        >
          Update
        </NavLink>
        <button
          onClick={handleDelete}
          disabled={deleting} 
          className="inline-block hover:bg-[#000000] bg-purple-400 hover:text-white text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
