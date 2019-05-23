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
      myusername: 'TASERFACE',
      users: [
        'Kevin',
        'TheLegend27',
        'LongUserNameTestTruncate',
        'Bottler',
        'JustifyContentCenter',
        'Stranger',
        'TASERFACE',
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

  render() {
      
    return (
      
      <React.Fragment>

        <Container className="w-75 mx-auto chat-main-container mt-4">
          <Row className="h-100">
            <Col xs="3" className="px-0 pb-3">

              <h5 className="text-light text-center">Currently Online: {this.state.users.length}</h5>

              <div className="height-userlist bg-userlist border rounded mt-3">

                {this.state.users.map(user => {

                let pClass = "text-light lead userlist-user px-3 my-0 py-2 text-truncate "
                if (user == this.state.myusername) { pClass += "font-weight-bold"}

                return (
                <p className={pClass}>{user}{(user == this.state.myusername)?<span> (You)</span>:null}</p>
                )})}
              </div>

            </Col>

            <Col xs={{size: 9, offset: 0}} className="d-flex flex-column">

              <MessageDisplay />

              {/* <div className="w-100 flex-grow-1 border rounded mb-2 p-3">
                <div className="w-100 overflow-custom">
                  <MessageDisplay />
                </div>
              </div>

              <div className="">
                <MessageForm onSend={this.handleSend} />
              </div> */}
            </Col>  





          </Row>




          




        </Container>

      </React.Fragment>
    )

  }
}

export default App;
