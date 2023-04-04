import {useState} from "react";
import Message from './Message';

const NewBudget = ({ 
    budget, 
    setBudget, 
    setIsValudBudget
}) => {

    const [message, setMessage] = useState('')

    const handleBudget = (e) => {
        e.preventDefault()
        if (!budget || budget < 0) {
            setMessage('No es un presupuesto valido')
            setIsValudBudget(false)
            return
        }

        setMessage('')
        setIsValudBudget(true)
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form className="formulario" onSubmit={handleBudget}>
                <div className="campo">
                    <label htmlFor="">Definir presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu presupuesto"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {message && <Message type="error">{message}</Message>}
            </form>
        </div>
    );
};

export default NewBudget;
