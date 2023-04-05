import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [msgList, setMsgList] = useState([{}]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
     // setMessageList((list) => [...list, messageData]);
     fetch(`/fetch/load/${room}`)
     .then((res)=>{
       if(res.ok){
         return res.json()
       }
     })
     .then(jsonRes=>setMsgList(jsonRes))
      setCurrentMessage("");
      
    }
    
      fetch(`/fetch/load/${room}`)
      .then((res)=>{
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonRes=>setMsgList(jsonRes))
    
    //console.log(msgList)
  };
   
  useEffect(()=>{
    fetch(`/fetch/load/${room}`)
      .then((res)=>{
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonRes=>setMsgList(jsonRes))
  },[])
  

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setMessageList((list) => [...list, data]);
      fetch(`/fetch/load/${room}`)
      .then((res)=>{
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonRes=>setMsgList(jsonRes))
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {
          msgList.map((messageContent) => {
            return (
              <div
              className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
              <div>
                <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                   <p id="author">{messageContent.author}</p>
                  </div>
                </div>
            </div>
            );
          })
          
          
          }
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input type="text" value={currentMessage} placeholder="Hello..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
