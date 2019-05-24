import React from 'react';

import './App.css';

import { Container, Row, Col } from 'reactstrap'

import Socket from './utils/socket'

import loading from './Ripple-1s-200px.gif'

import { FaUser, FaKey, FaBan } from "react-icons/fa";

import { Scrollbars } from 'react-custom-scrollbars'

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

      if (response.username == this.state.myUsername) { 
        let conversations = [...this.state.conversations ]
        let index = conversations.findIndex(x => x.timestamp == response.timestamp)
        console.log(`Found index: ${index}`)
        conversations[index] = { ...conversations[index] }
        delete conversations[index].ignorethis
        this.setState({ conversations })
      }

      // let index = this.state.conversations.indexOf(response)
      // console.log(`index: ${index}`)
      // if (index != -1) {
      //   console.log(`Match found`)
      //   let conversations = [...this.state.conversations]
      //   conversations[index] = { ...conversations[index] }
      //   conversations[index].sending = false
      //   this.setState({ conversations })
      // }
      
      else {
        console.log(`Match not found`)
        let conv = { ...response }
        if (conv.ignorethis) { delete conv.ignorethis }
        let conversations = [...this.state.conversations, conv]
        this.setState({ conversations })
      }
      
    })
  }

  handleSend = (message) => {
    const newConvo = {
      username: this.state.myUsername,
      message: message,
      timestamp: Date.now(),
      ignorethis: true,
    }
    // let sending = [...this.state.sending]
    // sending.push(newConvo)
    // this.setState({ sending })
    Socket.emit('BROADCAST_MESSAGE', newConvo)
    console.log('Sending broadcast: ', newConvo)
    let conversations = [...this.state.conversations, newConvo]
    this.setState({ conversations })
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

  handleClearBlockList = () => {
    this.setState({ blocked: [] })
  }

  handleClearWindow = () => {
    this.setState({ conversations: [] })
  }

  render() {
      
    const { myUsername, conversations, blocked } = this.state

    return (
      
      // <div tabIndex="0" onKeyDown={() => {this.messageForm.messageInput.focus()}}>
      <div>

        <Container 
          fluid 
          className="chat-main-container mt-4"
        >
          <Row className="h-100 chat-main-row">
            <Col md="3" className="px-2 pb-3">

              <h5 className="text-light text-center">Currently Online: {this.state.users.length}</h5>

              {/* <div className="height-userlist bg-userlist border rounded mt-3"> */}

              <Scrollbars 
                style={{ width: '100%', height: '83vh' }}
                className="bg-userlist border rounded mt-3"
                renderThumbVertical={(props) => <div {...props} className="userlist-thumb-vertical" />}
              >


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

              {/* </div> */}
              </Scrollbars>


            </Col>

            <Col md="9" className="d-flex flex-column">

              <MessageDisplay myUsername={myUsername} conversations={conversations} blocked={blocked}/>

              <div className="try-fix-height pt-0 w-100">
                <MessageForm 
                  onSend={this.handleSend} 
                  onClearBlockList={this.handleClearBlockList}
                  onClearWindow={this.handleClearWindow}
                  ref={(el) => this.messageForm = el}
                />
              </div>

            </Col>  





          </Row>




          




        </Container>

      </div>
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
