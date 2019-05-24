import React from 'react'

import moment from 'moment'

import { Scrollbars } from 'react-custom-scrollbars'

class MessageDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      time: 0,
    }
  }

  componentDidMount() {
    this.refreshTime = setInterval(
      () => this.setState({time: this.state.time + 1}),
      60000
    );
  }



  componentDidUpdate(prevProps) {
    if (prevProps.conversations.length != this.props.conversations.length) { 
      // if (this.props.conversations[this.props.conversations.length-1].username == this.props.myUsername ) {
        this.goToLatestMessage() 
      // }
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTime);
  }

  goToLatestMessage = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {

    const { conversations } = this.props

    return (

      <React.Fragment>
      
        
      
      <div className="w-100 flex-grow-1 border rounded mb-1 p-3 bg-dark mt-2">
        {/* <div className="w-100 overflow-custom"> */}
        <Scrollbars 
          style={{ 
            width: '100%', 
            height: '73vh',
          }}
          autoHide
          renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
          // renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} />}
          renderView={props => <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />}
        >

        {conversations.length ? null : 
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <h2 className="lead text-light text-center">No Messages to Display. Start chatting now!</h2>
          </div>
        }

        {conversations.map((conv, index) => {
          
          if (this.props.blocked.indexOf(conv.username) != -1) { return }

          let imgSrc = `https://api.adorable.io/avatars/50/${conv.username}.png`

          let username = conv.username
          if (conv.username == this.props.myUsername) { username = "You" }

          let mainDivClass = "mt-1 mb-2 d-flex mr-2 "
          if (conv.username == this.props.myUsername) { mainDivClass += "flex-row-reverse" }

          let imgDivClass = "d-flex flex-column justify-content-end p-1 "

          let messageDivClass = "d-flex flex-column msg-div-size p-2 "
          if (conv.username == this.props.myUsername) { messageDivClass += "align-items-end" }

          let pillDivClass = "border px-2 py-1 wrap-break rounded my-1 "
          if (conv.username == this.props.myUsername) { pillDivClass += "bg-message-self text-light align-self-end" }
          else { pillDivClass += "bg-message-other align-self-start" }

          return (

          <div className={mainDivClass} key={`Message${index}`}>
            <div className={imgDivClass}>
              <img 
                src={imgSrc} 
                width="50" 
                height="50" 
                className="rounded-circle border-avatar-custom mb-2">
              </img>
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

        </Scrollbars>
        {/* </div> */}
      </div>

      {/* <div className="try-fix-height pt-0 w-100 ml-2">
        <MessageForm onSend={this.handleSend} />
      </div> */}

      </React.Fragment>


    )

  }


}

export default MessageDisplay