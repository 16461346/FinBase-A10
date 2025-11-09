import React from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const Tips = () => {
  return (
    <div className="container pb-20 mx-auto">
      {/* Heading */}
      <div className="my-10 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl  justify-center gap-2 flex items-center font-bold">
          Money Management Tips <MdOutlineTipsAndUpdates color="#3dd7c9" />
        </h1>
      </div>

      {/* Card */}
      <div className="card lg:card-side bg-base-100 shadow-sm rounded-2xl transform transition duration-300 hover:shadow-xl hover:scale-105">
        {/* Text Section */}
        <div className="card-body pl-10">
          <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
            <li>
              <strong>Track Your Expenses:</strong>Record your daily or weekly
              expenses to understand which categories you spend the most on.
            </li>
            <li>
              <strong>Set a Monthly Budget:</strong> Create a category-wise
              budget according to your income; separate essentials, savings, and
              entertainment.
            </li>
            <li>
              <strong>Save Before Spending:</strong> Set aside a specific
              portion of your salary in a savings account for emergencies or
              investments.
            </li>
            <li>
              <strong>Avoid Impulse Purchases:</strong> Avoid buying unnecessary
              items; use a shopping list to stay organized.
            </li>
            <li>
              <strong>Use Digital Tools:</strong> Utilize expense tracking or
              budgeting apps; automate recurring bills and savings.
            </li>
            <li>
              <strong>Invest Smartly:</strong> Start with small investments and
              diversify based on risk and return.
            </li>
            <li>
              <strong>Review & Adjust:</strong> Check your expenses and budget
              at the end of the month and adjust the next month’s plan if
              needed.
            </li>
          </ol>
        </div>

        {/* Image Section */}
        <figure>
          <img
            className="w-160 p-4 rounded-2xl"
            src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?_gl=1*1j8xwrq*_ga*NTM3NzgyNDQ1LjE3NjI2MTU2ODE.*_ga_8JE65Q40S6*czE3NjI2Njg1MzMkbzMkZzEkdDE3NjI2Njk1MjgkajE0JGwwJGgw"
            alt="Money Management"
          />
        </figure>
      </div>
    </div>
  );
};

export default Tips;
