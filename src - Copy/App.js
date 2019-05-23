import React from 'react';

import './App.css';

import { Container, Row, Col } from 'reactstrap'

import MessageForm from './MessageForm'
import MessageDisplay from './MessageDisplay'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      input: '',
      validateFail: '',
      myusername: 'Hoho',
      users: [
        'Kevin',
        'TheLegend27',
        'LongUserNameTestTruncate',
        'Bottler',
        'Flex',
        'Stranger',
        'Hoho',
        'Developer',
        'Rose',
        'Coulthard',
        'RandomGuy',
        'GuyWithTwo****s',
        'MrWorldWide',
        'SendCatPics',
      ]
    }
  }

  handleSend = (message) => {
    alert(message)
  }

  render() {
      
    return (
      
      <React.Fragment>

        <Container className="w-75 mx-auto chat-main-container mt-4">
          <Row className="h-100">
            <Col xs="3" className="px-0 pb-3">

              <h5 className="text-light text-center">Currently Online: {this.state.users.length}</h5>

              <div className="height-userlist bg-userlist border rounded py-2 px-3 mt-3">

                {this.state.users.map(user => {

                let pClass = "text-light lead text-truncate "
                if (user == this.state.myusername) { pClass += "font-weight-bold"}

                return (
                <p className={pClass}>{user}{(user == this.state.myusername)?<span> (You)</span>:null}</p>
                )})}
              </div>

            </Col>

            <Col xs="9" className="d-flex flex-column">

              <div className="w-100 flex-grow-1 border rounded mb-2 p-3">
                <div className="w-100 overflow-custom">
                  <MessageDisplay />
                </div>
              </div>

              <div className="">
                <MessageForm onSend={this.handleSend} />
              </div>
            </Col>  





          </Row>




          




        </Container>

      </React.Fragment>
    )

  }
}

export default App;
