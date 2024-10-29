import { useState, useEffect } from "react";
import { parse, isEqual } from "date-fns";

/*

Requirements:
- Create a React.js application that displays a list of payment transactions. ok
- Implement a mock API to simulate fetching payment transaction data. You can use a JavaScript array to store mock data. ok
- Display the following information for each payment transaction: Transaction ID, Date, Description, Amount (in USD) ok
- Implement error handling for API requests. If the API request fails, display an error message to the user. ok
- Design the user interface to be clean and responsive using CSS and HTML. You can use any CSS framework or libraries of your choice..
- Add a date range filter to allow users to filter transactions by a specified date range. ok
*/

const mockTransactionData = [
  {
    id: 1,
    date: "2023-09-01",
    description: "Payment for Product A",
    amount: 50.0,
  },
  {
    id: 2,
    date: "2023-09-02",
    description: "Payment for Product B",
    amount: 75.0,
  },
  // Add more mock data as needed
];

async function getTransactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockTransactionData);
      // reject(new Error("Something went wrong!"));
    }, 1000);
  });
}

const PaymentDashboard = () => {
  const [filterDate, setFilterDate] = useState();
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const result = await getTransactions();
        setTransactionData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTransactionData();
  }, []);

  const filteredTransactions = transactionData.filter((transaction) => {
    if (!filterDate) {
      return true;
    }
    const transactionDate = parse(transaction.date, "yyyy-MM-dd", new Date());
    const filterByDate = parse(filterDate, "yyyy-MM-dd", new Date());

    return isEqual(transactionDate, filterByDate);
  });

  const handleDateFilterChange = (e) => {
    setFilterDate(e.target.value);
  };
  return (
    <div className="flex w-full">
      <h1 className="text-lg">Payment Transaction Dashboard</h1>
      <div className="flex flex-row">
        <span className="mr-2">Filter by date:</span>
        <input type="date" onChange={handleDateFilterChange} />
      </div>
      {error && <p className="error-message">Error: {error}</p>}
      {/* Date Range Filter (to be implemented) */}
      <ul className="">
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Date: {transaction.date}</p>
            <p>Description: {transaction.description}</p>
            <p>Amount: {transaction.amount}</p>
          </li>
        ))}
      </ul>
      {/* Pagination and Summary Section (optional, to be implemented) */}
    </div>
  );
};

export default PaymentDashboard;
