import React from 'react';
import './App.css';
import ExpenseComponent from './ExpenseComponent'

class App extends React.Component {
  constructor () {
    super() 
    this.state = {
      expenseList: [],
      openForm: false,

    }
    this.expenseType = ''
  }

  componentDidMount() {
      let localExpenseList = localStorage.getItem('expenseList')
      let jsonParsed = JSON.parse(localExpenseList)
      if(jsonParsed && jsonParsed.length) {
        this.setState({expenseList: jsonParsed})
      }
  }

  addExpense = () => {
    let amount = document.querySelector('#amount')
    let description = document.querySelector('#description')
    let expenseDate = document.querySelector('#exp-date')
    let incomeObject = {
      order: this.state.expenseList.length + 1,
      type: this.expenseType,
      amount: amount.value,
      description: description.value,
      expenseDate: expenseDate.value,
    }
    this.state.expenseList.push(incomeObject)
    localStorage.setItem("expenseList", JSON.stringify(this.state.expenseList))
    this.setState({ 
      expenseList: this.state.expenseList,
      openForm: false
    })
  }

  deleteExpense = (order) => {
    this.state.expenseList.splice(order - 1, 1)
    localStorage.setItem("expenseList", JSON.stringify(this.state.expenseList))
    this.setState({expenseList: this.state.expenseList})
  }

  openForm = (expense) => {
    this.expenseType = expense
    this.setState({openForm: true})
  }

  render() {
    const income = this.state.expenseList
    .filter(expense => expense.type === 'income')
    .map(expense => parseInt(expense.amount,10))
    .reduce((r, a) => {
      return r + a
    }, 0)

    const spending = this.state.expenseList
    .filter(expense => expense.type === 'spend')
    .map(expense => parseInt(expense.amount,10))
    .reduce((r, a) => {
      return r + a
    }, 0)
    const balance = income - spending

    return (
      <div className="App">
        <div className="header">
          <span className="balance-label">Balance</span>
          <h1 className="balance">{balance} INR</h1>
          <span className="income-label"> Income: {income} INR</span>
          <span className="spending-label">Spending: {spending} INR</span>
        </div>
        {!!this.state.expenseList.length &&
          <ExpenseComponent
            expenseList={this.state.expenseList}
            deleteExpense={this.deleteExpense}
          />
        }
        {this.state.openForm &&
          <div className="input-form">
            <input id="exp-date" type="text" placeholder="Date" />
            <input id="amount" type="text" placeholder="Amount" />
            <input id="description" type="text" placeholder="Description" />
            <button className="add-button" onClick={this.addExpense}> Add </button>
          </div>
        }
        <button className="add-income" onClick={() => this.openForm('income')}> Add Income </button>
        <button className="add-expense" onClick={() => this.openForm('spend')}> Add Spending </button>
      </div>
    );
  }
}

export default App;