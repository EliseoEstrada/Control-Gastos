import React from 'react'
import Expense from './Expense';

const ListExpense = ({
  expenses, 
  setEditExpense, 
  deleteExpense,
  filter,
  leakedExpenses
}) => {
  return (
    <div className='listado-gastos contenedor'>

        {
          filter ? (
            <>
              <h2>{leakedExpenses.length ? 'Gastos' : 'No hay Gastos creados'}</h2>
              {
                leakedExpenses.map( expense => (
                  <Expense 
                      key={expense.id}
                      expense ={expense}
                      setEditExpense={setEditExpense}
                      deleteExpense={deleteExpense}
                  />
                ))
              }
            </>
          ) : (
            <>
              <h2>{expenses.length ? 'Gastos' : 'No hay Gastos creados'}</h2>
              {
                expenses.map( expense => (
                  <Expense 
                      key={expense.id}
                      expense ={expense}
                      setEditExpense={setEditExpense}
                      deleteExpense={deleteExpense}
                  />
                ))
              }
            </>
          )
        }
    </div>
  )
}

export default ListExpense