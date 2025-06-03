import { useState } from "react";
import { toast } from "react-toastify";
import AddExpenses from "./AddExpenses";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Budget = () => {
  const [addBudget, setAddBudget] = useState(false);
  const [budgetValue, setBudgetValue] = useState(0);
  const [newBudget, setNewBudget] = useState("");

  const [expenses, setExpenses] = useState([]);

  const handleAddSubmit = () => {
    setBudgetValue(parseFloat(newBudget));
    setAddBudget(false);
    setNewBudget("");
  };

  const handleAddExpense = (amount, item) => {
    const expenseAmount = parseFloat(amount);

    if (budgetValue <= 0) {
      toast.error("You must set a budget before adding expenses!");
      return;
    }

    if (!item || isNaN(expenseAmount) || expenseAmount <= 0) {
      toast.error("Please enter a valid expense and item name.");
      return;
    }

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const remaining = budgetValue - totalExpenses;

    if (expenseAmount > remaining) {
      toast.warning("This expense exceeds your remaining budget!");
      return;
    }

    setExpenses((prev) => [...prev, { amount: expenseAmount, item }]);
    toast.success("Expense added successfully!");
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = budgetValue - totalExpenses;

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-blue-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold">Groceries & Food Budget</h2>
          <p className="mt-2 text-lg">
            Track your spending on groceries and food.
          </p>

          <div className="mt-4">
            <p className="font-bold">Total Budget: ${budgetValue}</p>
            <p className="font-bold">Total Expenses: ${totalExpenses}</p>
            <p className="font-bold">Remaining: ${remainingBudget}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setAddBudget(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Set Budget
            </button>
          </div>

          {addBudget && (
            <div className="mt-4 flex flex-wrap gap-3">
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="Enter amount"
                className="p-2 border border-gray-400 rounded-lg"
              />
              <button
                onClick={handleAddSubmit}
                className="p-2 bg-green-600 text-white rounded-lg"
              >
                Submit
              </button>
              <button
                onClick={() => setAddBudget(false)}
                className="p-2 bg-gray-400 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          )}

          <AddExpenses
            onSubmit={(amount, item) => handleAddExpense(amount, item)}
          />

          {expenses.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Expenses List:</h4>
              <ul className="mt-2 list-disc pl-5">
                {expenses.map((exp, index) => (
                  <li key={index}>
                    {exp.item} - ${exp.amount}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Budget;
