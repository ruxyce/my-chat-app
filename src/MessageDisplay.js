import React from 'react'

import moment from 'moment'

import MessageForm from './MessageForm'

class MessageDisplay extends React.Component {
  constructor() {
    super()
    this.state ={
      myusername: 'TASERFACE',
      conversations: [
        {username: 'Edwind', message: 'What did the ocean say to another ocean?', timestamp: 1544532325758},
        {username: 'NameisVeryLong', message: 'Sea you later?', timestamp: 1544532341078},
        {username: 'TASERFACE', message: 'Nothing. It just waved', timestamp: 1544532347412},
        {username: 'Josh', message: "I'm leaving this chatroom", timestamp: 1544532402998},
        {username: 'Kevin', message: "My parents were very protective. I couldn't even cross the street without them getting all excited, and placing bets.", timestamp: 1544566602998},
        {username: 'Jeffrey', message: "I used to think that the brain was the most wonderful organ in my body. Then I realized who was telling me this.", timestamp: 1544666402998},
        {username: 'TASERFACE', message: "When I was a kid I used to pray every night for a new bicycle. Then I realised that the Lord doesn't work that way so I stole one and asked Him to forgive me.", timestamp: 1546662402998},
        {username: 'Stranger', message: "hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha", timestamp: 1554632402998},
      ]
    }
  }

  handleSend = (message) => {
    const newConvo = {
      username: this.state.myusername,
      message: message,
      timestamp: Date.now()
    }
    let conversations = [...this.state.conversations, newConvo]
    this.setState({ conversations })
  }

  componentDidMount() {
    this.goToLatestMessage()
    // This doesn't work
  }

  componentDidUpdate() {
    this.goToLatestMessage()
  }

  goToLatestMessage = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {

    const { conversations } = this.state

    return (

      <React.Fragment>

      <div className="w-100 flex-grow-1 border rounded mb-1 p-3 bg-dark ml-2 mt-2">
        <div className="w-100 overflow-custom">

        {conversations.length ? null : 
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <h2 className="lead text-light">No Messages to Display. Start chatting now!</h2>
          </div>
        }

        {conversations.map((conv, index) => {
          
          let imgSrc = `https://api.adorable.io/avatars/50/${conv.username}.png`

          let username = conv.username
          if (conv.username == this.state.myusername) { username = "You" }

          let mainDivClass = "my-1 d-flex mr-2 "
          if (conv.username == this.state.myusername) { mainDivClass += "flex-row-reverse" }

          let imgDivClass = "d-flex flex-column justify-content-end p-1 "

          let messageDivClass = "d-flex flex-column wrap-break msg-div-size p-2 "
          if (conv.username == this.state.myusername) { messageDivClass += "align-items-end" }

          let pillDivClass = "border px-2 py-1 rounded my-1 "
          if (conv.username == this.state.myusername) { pillDivClass += "bg-message-self text-light" }
          else { pillDivClass += "bg-message-other" }

          return (

          <div className={mainDivClass} key={`Message${index}`} id={`Message${index}`}>
            <div className={imgDivClass}>
              <img src={imgSrc} className="rounded-circle border-avatar-custom mb-2"></img>
            </div>
            <div className={messageDivClass}>
              <span className="conv-small d-inline-block ml-1 mr-2 text-light font-weight-bold">{username}</span>
              <div className={pillDivClass}>
                <span className="wrap-break">{conv.message}</span>
              </div>
              <span className="conv-small d-inline-block ml-1 mr-2 text-light">{moment(conv.timestamp).fromNow()}</span>
            </div>
          </div>

        )})}

        <div ref={(el) => { this.messagesEnd = el; }}></div>

        </div>
      </div>

      <div className="try-fix-height pt-0 w-100 ml-2">
        <MessageForm onSend={this.handleSend} />
      </div>

      </React.Fragment>


    )

  }


}

export default MessageDisplay