import React from 'react'

import Moment from 'react-moment'
import 'moment-timezone'

class MessageDisplay extends React.Component {
  constructor() {
    super()
    this.state ={
      myusername: 'Hoho',
      conversations: [
        {username: 'Edwind', message: 'What did the ocean say to another ocean?', timestamp: 1544532325758},
        {username: 'NameisVeryLong', message: 'Sea you later?', timestamp: 1544532341078},
        {username: 'Hoho', message: 'Nothing. It just waved', timestamp: 1544532347412},
        {username: 'Josh', message: "I'm leaving this chatroom", timestamp: 1544532402998},
        {username: 'Kevin', message: "My parents were very protective. I couldn't even cross the street without them getting all excited, and placing bets.", timestamp: 1544566602998},
        {username: 'Jeffrey', message: "I used to think that the brain was the most wonderful organ in my body. Then I realized who was telling me this.", timestamp: 1544666402998},
        {username: 'Hoho', message: "When I was a kid I used to pray every night for a new bicycle. Then I realised that the Lord doesn't work that way so I stole one and asked Him to forgive me.", timestamp: 1546662402998},
        {username: 'Stranger', message: "What in damnation have you done?", timestamp: 1554632402998},
      ]
    }
  }

  render() {

    const { conversations } = this.state

    return (

      <React.Fragment>

        {conversations.map(conv => {
          
          let imgSrc = `https://api.adorable.io/avatars/50/${conv.username}.png`

          let username = conv.username
          if (conv.username == this.state.myusername) { username = "You" }

          let mainDivClass = "my-1 d-flex mr-2 "
          if (conv.username == this.state.myusername) { mainDivClass += "flex-row-reverse" }

          let imgDivClass = "d-flex flex-column justify-content-end p-1 "
          // if (conv.username == this.state.myusername) { imgDivClass += "justify-content-end" }

          let messageDivClass = "d-flex flex-column p-2 "
          if (conv.username == this.state.myusername) { messageDivClass += "align-items-end" }

          let pillDivClass = "border px-2 py-1 rounded my-1 "
          if (conv.username == this.state.myusername) { pillDivClass += "bg-message-self text-light" }
          else { pillDivClass += "bg-message-other" }

          return (

          <div className={mainDivClass}>
            <div className={imgDivClass}>
              <img src={imgSrc} className="rounded-circle border-avatar-custom mb-2"></img>
            </div>
            <div className={messageDivClass}>
              <span className="conv-small d-inline-block ml-1 mr-2 text-light font-weight-bold">{username}</span>
              <div className={pillDivClass}>
                <span>{conv.message}</span>
              </div>
              <span className="conv-small d-inline-block ml-1 mr-2 text-light"><Moment fromNow>{conv.timestamp}</Moment></span>
            </div>
          </div>

        )})}



      </React.Fragment>


    )

  }


}

export default MessageDisplay