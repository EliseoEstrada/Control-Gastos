import { useState, useEffect } from 'react';
import Message from './Message'
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({ 
    setModal, 
    animateModal, 
    setAnimateModal, 
    saveExpense,
    editExpense,
    setEditExpense
}) => {

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [id, setId] = useState('')
    
    useEffect(() => {
        if (Object.keys(editExpense).length > 0){
            setName(editExpense.name)
            setAmount(editExpense.amount)
            setCategory(editExpense.category)
            setDate(editExpense.date)
            setId(editExpense.id)
          }
    }, [])

    const hideModal = () => {
        setAnimateModal(false)
        setEditExpense({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()

        if([name, amount, category].includes('')){
            setMessage('Todos los campos son obligatorios')

            return
        }

        saveExpense({name, amount, category, id, date})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={hideModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animateModal ? 'animar' : ''}`}
            >
                <legend>{editExpense.name ? 'Editar Gasto': 'Nuevo Gasto'}</legend>
                
                {message && <Message type="error">{message}</Message>}

                <div className='campo'>
                    <label htmlFor="name">Nombre Gasto</label>
                    <input
                        type="text"
                        id="name"
                        placeholder='Añade el nombre del gasto'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="amount">Cantidad</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder='Añade la cantidad del gasto'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categories">Categoria</label>
                    <select 
                        id="categories"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastosVarios">Gastos varios</option>
                        <option value="entretenimiento">Entretenimiento</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={editExpense.name ? 'Guardar Cambios': 'Añadir Gasto'}
                />
            </form>
        </div>
    )
}

export default Modal