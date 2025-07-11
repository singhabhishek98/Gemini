import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../context/Context";

const Sidebar = () => {

    const [extend , setExtend] = useState(false)
    const {onSent, prevPrompt,setrecentPrompt,newChat} = useContext(Context)

    const loadPrompt = async (prompt)=>{
      setrecentPrompt(prompt)
      await onSent(prompt)
    }

    

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img onClick={()=> setExtend(prev=>!prev)} src={assets.menu_icon} className="menu" />
          <div onClick={()=>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extend ? 
            <p>New Chat</p>
             : null}
          </div>
            {extend ?
          <div className="recent">
            <p className="recet-title">Recent</p>
            {prevPrompt.map((item,index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} key={index} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,20)}...</p>
            </div>
              )
            })}
         
          </div>
              : null}
        </div>

        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="ask me!" />
                {extend ? 
                <p>Help</p>
                : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="ask me!" />
                {extend ? 
                <p>Activity</p>
                : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="ask me!" />
                {extend ? 
                <p>Setting</p>
                : null}
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
