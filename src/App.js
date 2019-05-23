import React from 'react';

import './App.css';

import { Container, Row, Col } from 'reactstrap'

import Socket from './utils/socket'

import loading from './Ripple-1s-200px.gif'

import { FaUser, FaKey, FaBan } from "react-icons/fa";

import MessageForm from './MessageForm'
import MessageDisplay from './MessageDisplay'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      input: '',
      validateFail: '',
      myUsername: '',
      users: [],
      conversations: [],
      blocked: [],
    }

    Socket.emit('NEW_USER')

    Socket.on('GET_CURRENT_USER', user => {
      console.log('GET_CURRENT_USER returned: ', user)
      this.setState({ 
        myId: user.id,
        myUsername: user.username,
      })
    })
  
    Socket.on('UPDATE_USER_LIST', users => {
      console.log('UPDATE_USER_LIST returned:', users)
      this.setState({ users: users })
    })

    Socket.on('RECEIVE_BROADCAST', response => {
      console.log(response)
      let conversations = [...this.state.conversations, response]
      this.setState({ conversations })
    })
  }

  handleSend = (message) => {
    const newConvo = {
      username: this.state.myUsername,
      message: message,
      timestamp: Date.now()
    }

    Socket.emit('BROADCAST_MESSAGE', newConvo)
    console.log('Sending broadcast: ', newConvo)
  }

  handleBlockToggle = (user) => {
    const { myUsername, blocked } = this.state
    if (user == myUsername) { return }
    let newBlocked = [...blocked]
    if (blocked.indexOf(user) != -1) { 
      newBlocked.splice(blocked.indexOf(user),1)
      this.setState({ blocked: newBlocked })
    }
    else {
      newBlocked.push(user)
      this.setState({ blocked: newBlocked })
    }
  }

  render() {
      
    const { myUsername, conversations, blocked } = this.state

    return (
      
      <React.Fragment>

        <Container className="w-75 mx-auto chat-main-container mt-4">
          <Row className="h-100">
            <Col xs="3" className="px-0 pb-3">

              <h5 className="text-light text-center">Currently Online: {this.state.users.length}</h5>

              <div className="height-userlist bg-userlist border rounded mt-3">

                {(this.state.users.length)?null:
                  <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <img src={loading} width="75" height="75" className="d-block"></img>
                    <p className="text-light">Setting you up...</p>
                  </div>
                }

                {this.state.users.map(user => {

                let pClass = "text-light lead userlist-user px-2 text-truncate "
                if (user.username == this.state.myUsername) { pClass += "font-weight-bold"}

                return (
                  <div className="d-flex w-100 align-items-center userlist-user px-2 py-1" onClick={() => this.handleBlockToggle(user.username)}>
                    { (user.username == this.state.myUsername)?<span className="userlist-icon"><FaKey /></span>
                      :((this.state.blocked.indexOf(user.username)!=-1)?
                      <span className="userlist-icon"><FaBan /></span>:
                      <span className="userlist-icon"><FaUser /></span>)
                    }
                    <div className={pClass}>{user.username}{(user.username == this.state.myUsername)?<span> (You)</span>:null}</div>
                  </div>
                )})}
              </div>

            </Col>

            <Col xs={{size: 9, offset: 0}} className="d-flex flex-column">

              <MessageDisplay myUsername={myUsername} conversations={conversations} blocked={blocked}/>

              <div className="try-fix-height pt-0 w-100 ml-2">
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



// {username: 'Edwind', message: 'What did the ocean say to another ocean?', timestamp: 1544532325758},
// {username: 'NameisVeryLong', message: 'Sea you later?', timestamp: 1544532341078},
// {username: 'TASERFACE', message: 'Nothing. It just waved', timestamp: 1544532347412},
// {username: 'Josh', message: "I'm leaving this chatroom", timestamp: 1544532402998},
// {username: 'Kevin', message: "My parents were very protective. I couldn't even cross the street without them getting all excited, and placing bets.", timestamp: 1544566602998},
// {username: 'Jeffrey', message: "I used to think that the brain was the most wonderful organ in my body. Then I realized who was telling me this.", timestamp: 1544666402998},
// {username: 'What', message: "When I was a kid I used to pray every night for a new bicycle. Then I realised that the Lord doesn't work that way so I stole one and asked Him to forgive me.", timestamp: 1546662402998},
// {username: 'Why', message: "hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha", timestamp: 1554632402998},