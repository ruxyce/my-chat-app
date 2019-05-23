import React from 'react'
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap'

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      validateFail: false,
    }
  }
  
  handleSubmit = event => {
    event.preventDefault()
    if (this.state.message.length) {
      this.props.onSend(this.state.message)
      this.setState({message: ''})
      this.setState({validateFail: false})
    }
    else { this.setState({validateFail: true}) }
  }
  
  handleInput = event => {
    this.setState({ message: event.target.value })
  }
  
  render() {
      
    let pClass = "font-italic text-center text-warning mt-1 mb-0 "
    pClass += (this.state.validateFail) ? "" : "d-none"

    return (
    
      <React.Fragment>
        <p className={pClass}>Please enter valid task.</p>
        <Form onSubmit={this.handleSubmit} className="mx-2 mt-3">
          <FormGroup>
            <InputGroup>
              <Input
                type="text"
                onChange={this.handleInput}
                value={this.state.message}
                placeholder="Enter a message to start chatting!"
                invalid={this.state.validateFail}
              />
              <InputGroupAddon addonType="append">
                <Button type="submit" style={{backgroundColor: 'rgb(82, 11, 82)'}}>Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </React.Fragment>
    )
  }
}

export default MessageForm