import React, { Component } from 'react'
import './index.css'
import Modal from './modal'
import Notification from './notification'
import content from './assets/content.json'
export default class Feedback extends Component {
    state = {
        selectedAction: null,
        notification: null,
        sendFeedbackLoader: false
    }

    setAction = (action) => {
        this.setState({ selectedAction: action })
    }

    handleClose = () => {
        this.setState({ selectedAction: null })
    }

    sendFeedback = (url, data) => {
        this.setState({ sendFeedbackLoader: true })
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTcxZjMzYmUyMWQ4NGVkZGVmZjJhZiIsImVtYWlsIjoianVuYWlkd2FyaXM2N0BnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU3MjUyNTQ3NCwiZXhwIjoxNjA0MDgzMDc0fQ.eJVbLfG3bkKOli5Yfr98nyL0-CXANf36bbL_hllicok'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ sendFeedbackLoader: false, notification: "Sent feedback." })
                this.handleClose()

                // just to close notification after 5s
                setTimeout(() => {
                    this.setState({ notification: null })
                }, 3000);
            })
            .catch((error) => {
                this.setState({ error: JSON.stringify(error), sendFeedbackLoader: false })
            })
    }

    render() {
        const { selectedAction, sendFeedbackLoader, notification } = this.state
        const { btnText, happy, idea, sad } = content

        return (
            <div className='feedback-container'>
                <Notification notification={notification} />
                <div className='feedback-button-wrapper'>
                    <div className='feedback-button-icons'>
                        <img onClick={() => this.setAction('happy')} alt={happy.title} src={require('./assets/smile.png')} title={happy.title} />
                        <img onClick={() => this.setAction('idea')} alt={idea.title} src={require('./assets/idea.png')} title={idea.title} />
                        <img onClick={() => this.setAction('sad')} alt={sad.title} src={require('./assets/sad.png')} title={sad.title} />
                    </div>
                    <div className='feedback-button-text'>{btnText}</div>

                    <Modal
                        open={selectedAction ? true : false}
                        selectedAction={selectedAction}
                        handleClose={this.handleClose}
                        sendFeedback={this.sendFeedback}
                        loader={sendFeedbackLoader}
                        content={content}
                    />
                </div>
            </div>
        )
    }
}
