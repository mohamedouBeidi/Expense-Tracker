import { useState, useEffect } from "react";
import './tracker.css';
const Tracker = () => {
    let [income, setIncome] = useState(0);
    let [expense, setExpense] = useState(0);
    let [text, setText] = useState('');
    let [amount, setAmount] = useState(0);
    let [transactions, setTransactions] = useState([]);
    let balance = income + expense;
    // function to handle the form submission
    const removeTransaction = (index) => {
        setTransactions(transactions.filter((item, i) => i !== index))
    }
    const handeler = (event) => {
        event.preventDefault();
        if(amount > 0){
            setIncome(income + amount);
        }else{
            setExpense(expense - amount);
        }
        transactions.push({text, amount});
        // put in local storage
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    // function to remove the transaction
    // get the data from local storage
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('transactions'));
        if(data){
            setTransactions(data);
            let income = data.filter((item) => item.amount > 0).reduce((acc, item) => (acc += item.amount), 0);
            let expense = data.filter((item) => item.amount < 0).reduce((acc, item) => (acc += item.amount), 0);
            setIncome(income);
            setExpense(expense);
        }
    }, [])
    return (
        <div className="parent">
            <h1>You balance:</h1>
            <p>${balance}</p>
            <div className="child">
                <div className="income">
                    <h2>Income:</h2>
                    <p>${income}</p>
                </div>
                <div className="expense">
                    <h2>expense:</h2>
                    <p>${expense}</p>
                </div>
            </div>
            <div className="history">
            <h1>History</h1>
                <ul>
                {transactions.map((item, index) => {
                        if(item.amount > 0){
                            return <li key={index} id="element" className="income-border"><p>{item.text}</p> <p>${item.amount}</p> <button className="skip" onClick={() => removeTransaction(index)}>x</button></li>
                        } else {
                            return <li key={index} id="element" className="expense-border"><p>{item.text}</p> <p>${Math.abs(item.amount)}</p> <button className='skip' onClick={() => removeTransaction(index)}>x</button></li>
                        }
                    })}
                </ul>
            </div>
            <h1>Add new transaction</h1>
            <form onSubmit={(e) => handeler(e)}>
                <label>Text</label>
                <input type="text" placeholder="Text" onChange={(e) => setText(e.target.value)}/>
                <label>Amount <br/> (-negative:expense; +positive: income)</label>
                <input type="number" placeholder="Amount" onChange={(e) => setAmount(+e.target.value)}/>
                <button>Add transaction</button>
            </form>
        </div>
    )
}

export default Tracker;