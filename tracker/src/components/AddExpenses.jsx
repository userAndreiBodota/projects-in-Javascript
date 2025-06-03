import { useState } from "react";

const AddExpenses = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");

  const handleSubmit = () => {
    if (!amount || isNaN(amount)) return;
    onSubmit(parseFloat(amount), item);
    setAmount("");
    setItem("");
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Add item"
        className="p-2 border-rounded mr-2"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Add amount"
        className="p-2 border-rounded mr-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add Expense
      </button>
    </div>
  );
};

export default AddExpenses;
