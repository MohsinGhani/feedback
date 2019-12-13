import React from 'react'

const Error = ({ error }) => {
    if (error) return <div className='default-error'>{error}</div>
    else return null
}

export default Error