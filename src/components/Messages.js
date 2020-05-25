
import React from 'react' 
import MessageItem from './MessageItem'
import MessageForm from './MessageForm'
// npm install axios
import axios from 'axios'

class Messages extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3033/messages')
            .then((response) => {
                const messages = response.data 
                this.setState({ messages })
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    addMessage = (message) => {
        axios.post('http://localhost:3033/messages', message)
            .then((response) => {
                const message = response.data
                this.setState((prevState) => {
                    return {
                        messages: prevState.messages.concat(message)
                    }
                })
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    removeMessage = (id) => {
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove) {
            axios.delete(`http://localhost:3033/messages/${id}`)
                .then((response) => {
                    const rMessage = response.data
                    this.setState((prevState) => {
                        return {
                            messages: prevState.messages.filter(msg => msg.id != rMessage.id)
                        }
                    })
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }

    updateMessage = (id, message) => {
        axios.put(`http://localhost:3033/messages/${id}`, message)
            .then((response) => {
                const message = response.data 
                this.setState((prevState) => {
                    return {
                        messages: prevState.messages.map((msg) => {
                            if(msg.id == message.id) {
                                return Object.assign({}, msg, message)
                            } else {
                                return Object.assign({}, msg)
                            }
                        })
                    }
                })
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    render() {
        return (
            <div>
                <h2>My Messages - { this.state.messages.length } </h2>

                { this.state.messages.map(message => {
                    return <MessageItem 
                                key={message.id} 
                                id={message.id}
                                body={message.body}
                                createdAt={message.createdAt}
                                removeMessage={this.removeMessage}
                                updateMessage={this.updateMessage}
                            />
                })}

                <MessageForm addMessage={this.addMessage} />
            </div>
        )
    }
}

export default Messages