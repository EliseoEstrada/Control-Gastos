import React from 'react'
import NewBudget from './NewBudget'
import ControlBudget from './ControlBudget';

const Header = ({
    expenses,
    setExpenses,
    budget,
    setBudget,
    isValudBudget,
    setIsValudBudget
}) => {
    return (
        <header>
            <h1>Planificador de gastos</h1>

            {isValudBudget ? (
                <ControlBudget
                    expenses={expenses}
                    setExpenses={setExpenses}
                    budget={budget}
                    setBudget={setBudget}
                    setIsValudBudget={setIsValudBudget}
                />
            ) : (
                <NewBudget
                    budget={budget}
                    setBudget={setBudget}
                    setIsValudBudget={setIsValudBudget}
                />
            )}
        </header>
    )
}

export default Header