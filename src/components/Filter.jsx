import {useState, useEffect} from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form >
            <div className='campo'>
                <label >Filtrar gastos</label>
                <select 
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="">Todas las categoriass</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastosVarios">Gastos varios</option>
                    <option value="entretenimiento">Entretenimiento</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filter