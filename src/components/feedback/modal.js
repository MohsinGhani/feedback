import React from 'react'
import Error from './error'

class Modal extends React.Component {

    state = {
        text: '',
        email: '',
        error: ''
    }

    renderSelectedItemText = () => {
        const { selectedAction, content: { happy, idea, sad } } = this.props
        switch (selectedAction) {
            case 'happy':
                return happy.title;

            case 'idea':
                return idea.title;

            case 'sad':
                return sad.title

            default:
                break;
        }
    }

    renderLabel = () => {
        const { selectedAction, content: { happy, idea, sad } } = this.props
        switch (selectedAction) {
            case 'happy':
                return happy.question;

            case 'idea':
                return idea.question;

            case 'sad':
                return sad.question

            default:
                break;
        }
    }

    handleInput = (e) => {
        const { target: { id, value } } = e
        this.setState({
            [id]: value,
            error: ''
        })
    }

    handleSubmut = () => {
        const { email, text } = this.state
        const { selectedAction } = this.props
        if (this.customValidation()) {
            let url = 'https://api.ezilmdev.org:3000/api/sys/feedback';
            let data = {
                type: selectedAction,
                email,
                url,
                link: { key: "AR_l1_U1_E1_S002", component: "EZSlides" },
                text
            }
            this.props.sendFeedback(url, data)
        }
    }



    customValidation = () => {
        const { email, text } = this.state
        if (!text) {
            this.setState({ error: 'field should not be empty' })
            return false
        }
        if (!email) {
            this.setState({ error: 'email should not be empty' })
            return false
        }
        if (!validateEmail(email)) {
            this.setState({ error: 'email is not valid' })
            return false
        }

        return true

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }

    render() {
        const { email, text, error } = this.state
        const { open, loader } = this.props
        return (
            <div className={open ? "dialog display-block" : "dialog display-none"}>
                <div className={'dialog-content'}>
                    <header className='dialog__header'>
                        <img src={require('./assets/dialogue.png')} alt={'text icon'} />
                    </header>

                    <div className='dialog__content'>
                        <h3 className="dialog__selected_action">
                            {this.renderSelectedItemText()}
                        </h3>
                        <hr />
                        <form className='dialog__feedback-form'>
                            <div className='dialog__form-control'>
                                <label>{this.renderLabel()}</label>
                                <input type='text' id={'text'} value={text} onChange={this.handleInput} />
                            </div>
                            <br />
                            <div className='dialog__form-control'>
                                <label className=''>EMAIL</label>
                                <input type='email' id={'email'} value={email} placeholder={'xyz@example.com'} onChange={this.handleInput} />
                            </div>
                        </form>
                    </div>

                    <Error error={error} />

                    <footer className='dialog__footer'>
                        <button disabled={loader} onClick={this.handleSubmut} type="button" className="btn dialog__btn submit">
                            {loader ? '...' : 'Submit'}
                        </button>
                        <button onClick={this.props.handleClose} type="button" className="btn dialog__btn">
                            Close
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
};

export default Modal;