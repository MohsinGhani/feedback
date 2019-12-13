import React from 'react'

const Notification = ({ notification }) => {
    if (notification) return <div className='default-notification'><strong>Success!</strong> {notification}</div>
    else return null
}

export default Notification;