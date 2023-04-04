import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter';
import ListExpense from './components/ListExpense'
import Modal from './components/Modal'
import { generateId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget') ?? 0)
  )
  const [isValudBudget, setIsValudBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [leakedExpenses, setLeakedExpenses] = useState([])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0){
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if(filter){
      const leakedExpenses = expenses.filter( expense => expense.category === filter)
      setLeakedExpenses(leakedExpenses)
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget') ?? 0)
    if(budgetLS > 0){
      setIsValudBudget(true)
    }
  }, [])

  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = newExpense => {
    if(newExpense.id){
      // Actualizar
      const updatedExpenses = expenses.map(expenseState => {
        if(expenseState.id === newExpense.id){
          return newExpense
        }else{
          return expenseState
        }
      })
      // actualizar lista de gastos
      setExpenses(updatedExpenses)
      setEditExpense({})
    }else{
      // Nuevo
      newExpense.id = generateId()
      newExpense.date = Date.now()
      setExpenses([...expenses, newExpense])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      < Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValudBudget={isValudBudget}
        setIsValudBudget={setIsValudBudget}
      />

      {isValudBudget && (
        <>
          <main>
            <Filter 
              filter={filter}
              setFilter={setFilter}
            />
            
            <ListExpense
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              leakedExpenses={leakedExpenses}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="icono-nuevo-gasto"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      }
    </div>
  )
}

export default App
