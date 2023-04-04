import React from 'react'

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import { dateFormater } from '../helpers'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoEntretenimiento from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const iconsDictionary = {
    ahorro: IconoAhorro,
    comida: IconoCasa,
    casa: IconoComida,
    gastosVarios: IconoGastos,
    entretenimiento: IconoEntretenimiento,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Expense = ({ expense, setEditExpense, deleteExpense }) => {
    const { category, name, amount, id, date} = expense

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => setEditExpense(expense)}
            >
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => deleteExpense(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img 
                            src={iconsDictionary[category]} 
                            alt="icono-gasto" 
                        />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>
                                {category}
                            </p>
                            <p className='nombre-gasto'>
                                {name}
                            </p>
                            <p className='fecha-gasto'>
                                Agregado el: {''}
                                <span>{dateFormater(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense