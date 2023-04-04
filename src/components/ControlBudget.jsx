import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlBudget = ({ 
    expenses,
    setExpenses, 
    budget,
    setBudget,
    setIsValudBudget
}) => {

    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
        const spentTotal = expenses.reduce((total, expense) => expense.amount + total, 0)
        const availableTotal = budget - spentTotal

        setSpent(spentTotal)
        setAvailable(availableTotal)

        // calcular porcentaje gastado
        const newPercentage = (((budget - availableTotal) / budget) * 100).toFixed(2)
        setTimeout(() => {
            setPercentage(newPercentage)
        }, 500)

    }, [expenses])

    const amountFormat = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(result){
            setExpenses([])
            setBudget(0)
            setIsValudBudget(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#f5f5f5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={percentage}
                    text={`${percentage}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {amountFormat(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : ''}`}> 
                    <span>Disponible: </span> {available}
                </p>
                <p>
                    <span>Gastado: </span> {spent}
                </p>
            </div>
        </div>
    )
}

export default ControlBudget