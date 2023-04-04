import React from 'react'

const Message = ({ children, type }) => {
    return (
        <div className={`alerta ${type}`}>
            {children}
        </div>
    )
}

export default Message