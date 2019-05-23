import React from 'react'
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, FormFeedback } from 'reactstrap'

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isInvalid: false,
      feedback: '',
    }
  }
  
  handleSubmit = event => {
    event.preventDefault()
    if (this.state.message.length) {
      this.props.onSend(this.state.message)
      this.setState({
        message: '',
        isInvalid: false,
      })
    }
    else { this.setState({
      isInvalid: true,
      feedback: 'UNABLE TO SEND EMPTY MESSAGE',
      }) 
    }
  }
  
  handleInput = event => {
    if (event.target.value.length > 250) {
      this.setState({
        isInvalid: true,
        feedback: 'MAXIMUM NUMBER OF CHARACTERS REACHED (250)',
        message: event.target.value.substring(0,250)
      })
    }
    else {
      if (this.state.isInvalid == true) { this.setState({ isInvalid: false }) }
      this.setState({ message: event.target.value })
    }
  }
  
  render() {
      
    let pClass = "font-italic text-center text-warning mt-1 mb-0 "
    pClass += (this.state.isInvalid) ? "" : "d-none"

    return (
    
      <React.Fragment>
        
        <Form onSubmit={this.handleSubmit} className="mx-2 mt-3">
          <FormGroup>
            <InputGroup>
              <Input
                type="text"
                onChange={this.handleInput}
                value={this.state.message}
                placeholder="Enter a message to start chatting!"
                invalid={this.state.isInvalid}
              />
              <span>
                <InputGroupAddon addonType="append">
                  <Button style={{backgroundColor: 'rgb(82, 11, 82)'}} type="submit">Send</Button>
                </InputGroupAddon>
              </span>
              <FormFeedback><span className="text-feedback">{this.state.feedback}</span></FormFeedback>
            </InputGroup>
            
          </FormGroup>
        </Form>
        {/* <p className={pClass}>Please enter valid task.</p> */}
      </React.Fragment>
    )
  }
}

// style={{backgroundColor: 'rgb(82, 11, 82)'}}

export default MessageForm