import React from 'react'
import { 
  Button, 
  Form, 
  FormGroup, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupButtonDropdown,
  InputGroupDropdown,
  FormFeedback,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

import { TiCog } from "react-icons/ti";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isInvalid: false,
      feedback: '',
      splitButtonOpen: false,
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
  
  toggleSplit = () => {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
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
                placeholder="Enter a message..."
                invalid={this.state.isInvalid}
                autofocus="true"
                // className="rounded-0"
              />
              {/* <span> */}
                {/* <InputGroupAddon addonType="append">
                  <Button style={{backgroundColor: 'rgb(82, 11, 82)'}} type="submit">Send</Button>
                </InputGroupAddon> */}

                <InputGroupButtonDropdown addonType="append" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
            <Button 
              style={{
               backgroundColor: 'rgb(82, 11, 82)',
              }}
              type="submit">Send</Button>
            <DropdownToggle split outline />
            <DropdownMenu>
              <DropdownItem header>Chat App</DropdownItem>
              <DropdownItem onClick={this.props.onClearBlockList}>Clear Block List</DropdownItem>
              <DropdownItem onClick={this.props.onClearWindow}>Clear Chat Messages</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>



              {/* </span> */}
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