import { useEffect, useState } from "react";
import axios from "axios";
import { NoAuth } from "./noAuth";
import { api } from "../assets/url";

interface DataItem {
  id: string,
  name: string,
  amount: number,
  userId: string
};

export const Dashboard = (): React.ReactNode => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  const isVerified = (): boolean => {
    const token = localStorage.getItem('token-expense-tracker');
    if(!token){
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log('kem chod');
    const fetchData = async () => { 
      try{
        setLoading(true);
        const response = await axios.get(`${api}/expense/bulk`,{
          headers: {
            Authorization: `bearer ${localStorage.getItem('token-expense-tracker')}`
          }
        });

        setData(response.data.Data);
        console.log(data);
        setLoading(false);
      } catch(e){
        console.log(`Error : ${e}`);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let total = 0;
    if (isVerified()){
      for (let i of data) total += i.amount;
    }
    setTotalExpense(total);
  }, [data]);


  const addExpense = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
      const payload = {
        name: expenseName,
        amount: expenseAmount
      }
      console.log(payload);
      const response = await fetch(`${api}/expense`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${localStorage.getItem('token-expense-tracker')}`
          },
          
          body: JSON.stringify(payload),
      });

      if(response.status == 200){
        console.log(response);
        window.location.reload();
      } else {
        console.log(response)  
        console.log('something went wrong')
      }
    } catch(e){
      console.log(e);
    }
  };

  const deleteExpense = async (userId: string) => {
    setLoading(true);
    await fetch(`${api}/expense/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${localStorage.getItem('token-expense-tracker')}`
      }
    });
    data.pop()
    setData(data.filter(element => element.id !== userId));
    setLoading(false);
  }

  return (
    <>{isVerified() 
      ? 

      <div className="flex flex-col h-full">
        <main className="flex-1 p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div>
              <h2 className="text-xl font-bold mb-4 sm:text-2xl md:text-3xl">Dashboard</h2>

              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8">
                  <span className="text-gray-500 mb-2 sm:mb-0">Total Spent</span>
                  <span className="text-2xl font-bold sm:text-3xl md:text-4xl">&#8377;{totalExpense.toString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8">
                  <span className="text-gray-500 mb-2 sm:mb-0">This Month</span>
                  <span className="text-2xl font-bold sm:text-3xl md:text-4xl"></span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <span className="text-gray-500 mb-2 sm:mb-0">Last Month</span>
                  <span className="text-2xl font-bold sm:text-3xl md:text-4xl"></span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 sm:text-2xl md:text-3xl">Add Expense</h2>
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
                <form onSubmit={addExpense}>
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <label htmlFor="name" className="block text-gray-500 font-bold mb-2 sm:mb-3 md:mb-4">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter expense name"
                      value={expenseName}
                      required
                      onChange={(e) => {setExpenseName(e.target.value)}}
                    />
                  </div>
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <label htmlFor="amount" className="block text-gray-500 font-bold mb-2 sm:mb-3 md:mb-4">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      placeholder="Enter expense amount"
                      value={expenseAmount}
                      onChange={(e) => {setExpenseAmount(parseInt(e.target.value))}}
                    />
                  </div>
                  {/* <div className="mb-4 sm:mb-6 md:mb-8">
                    <label htmlFor="date" className="block text-gray-500 font-bold mb-2 sm:mb-3 md:mb-4">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div> */}
                  <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                  >
                    Add Expense
                  </button>
                </form>
              </div>
            </div>
            
          </div>
          {/* <div className="mt-6 sm:mt-8 md:mt-10">
            <h2 className="text-xl font-bold mb-4 sm:text-2xl md:text-3xl">Expenses by Month</h2>
            <div className="bg-white rounded-lg shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 p-6 sm:p-8 md:p-10">
                <div className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg font-bold mb-2 sm:text-xl md:text-2xl">January</h3>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Groceries</span>
                    <span className="text-gray-700 sm:text-right">$123.45</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Rent</span>
                    <span className="text-gray-700 sm:text-right">$1,200.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-gray-500 mb-2 sm:mb-0">Utilities</span>
                    <span className="text-gray-700 sm:text-right">$87.65</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg font-bold mb-2 sm:text-xl md:text-2xl">February</h3>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Groceries</span>
                    <span className="text-gray-700 sm:text-right">$145.78</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Dining Out</span>
                    <span className="text-gray-700 sm:text-right">$65.43</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-gray-500 mb-2 sm:mb-0">Gas</span>
                    <span className="text-gray-700 sm:text-right">$78.90</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg font-bold mb-2 sm:text-xl md:text-2xl">March</h3>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Rent</span>
                    <span className="text-gray-700 sm:text-right">$1,200.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Utilities</span>
                    <span className="text-gray-700 sm:text-right">$92.75</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-gray-500 mb-2 sm:mb-0">Entertainment</span>
                    <span className="text-gray-700 sm:text-right">$45.00</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg font-bold mb-2 sm:text-xl md:text-2xl">April</h3>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Groceries</span>
                    <span className="text-gray-700 sm:text-right">$156.89</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gray-500 mb-2 sm:mb-0">Dining Out</span>
                    <span className="text-gray-700 sm:text-right">$78.23</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-gray-500 mb-2 sm:mb-0">Gas</span>
                    <span className="text-gray-700 sm:text-right">$85.67</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {loading == true ? <div>Loading...</div> : 
                      <div className="mt-6 sm:mt-8 md:mt-10">
                      <h2 className="text-xl font-bold mb-4 sm:text-2xl md:text-3xl">Recent Transactions</h2>
                      <div className="bg-white rounded-lg shadow-lg">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="py-2 px-4 text-left sm:py-3 sm:px-6 md:py-4 md:px-8">Name</th>
                              <th className="py-2 px-4 text-left sm:py-3 sm:px-6 md:py-4 md:px-8">Amount</th>
                              <th className="py-2 px-1 text-left sm:py-3 sm:px-6 md:py-4 md:px-8">Delete</th>
                              {/* <th className="py-2 px-4 text-left sm:py-3 sm:px-6 md:py-4 md:px-8">Date</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {data.map(item => (
                              <tr key={item.id}>
                                <td className="py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8">{item.name}</td>
                                <td className="py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8">&#8377;{item.amount}</td>
                                <td className="py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8">
                                  <button className="text-sm text-red-500 border-1 border-red-500 hover:text-white hover:bg-red-500 p-2 rounded rounded-lg" onClick={() => {
                                    deleteExpense(item.id)
                                  }}>Delete</button>
                                </td>
                                {/* <td className="py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8">2023-03-25</td> */}
                              </tr>
                            ))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
          }


        </main>
      </div>

      : 

        <NoAuth/>

      }
    </>
    )
}