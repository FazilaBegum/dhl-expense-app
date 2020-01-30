import React from 'react'
import logo from './delete1.png'

export default class ExpenseComponent extends React.Component {
    render() {
        return (
            <ul className="expense-list">
                {this.props.expenseList.map(((expense, i) => {
                    return(
                        <li key={i}>
                            <span className="date-show">{expense.expenseDate}</span>
                            <span className={`amount-show ${expense.type === 'income' ? 'income' : 'spend'}`}>{expense.amount}</span>
                            <span className="description-show">{expense.description}</span>
                            <img className="delete" src={logo} height="30" width="30" onClick={() => {this.props.deleteExpense(expense.order)}} />
                        </li>
                    )
                }))}
            </ul>
        )
    }
}