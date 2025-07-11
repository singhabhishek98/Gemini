import {useState,useEffect, useRef, createContext } from "react";
import run from '../config/GeminiAPI'

export const Context = createContext()

const ContextProvider = (props) => {

    const [input, setinput] = useState("")
    const [recentPrompt, setrecentPrompt] = useState("")
    const [prevPrompt, setprevPrompt] = useState([])
    const [showResult, setshowResult] = useState(false)
    const [loading, setloading] = useState(false)
    const [resultData, setresultData] = useState('')
    const [chatHistory, setChatHistory] = useState({});


    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setresultData(prev=>prev+nextWord)
        }, 10*index);
    }

      const newChat = ()=>{
        setloading(false)
        setshowResult(false)
    }

    const onSent = async(prompt)=>{
        setresultData('')
        setloading(true)
        setshowResult(true)
       let response ;
       if(prompt !== undefined){
        response = await run(prompt)
        setrecentPrompt(prompt)
       }
       else{
        setprevPrompt(prev=>[...prev, input])
        setrecentPrompt(input)
        response = await run(input)
       }
       let responseArray = response.split("**");
       let newResponse = "";
       
       for (let i = 0; i < responseArray.length; i++) {
         if (i % 2 === 0) {
           newResponse += responseArray[i];
         } else {
           newResponse += `<b>${responseArray[i]}</b>`;
         }
       }
       
       let newResponseFormatted = newResponse.replace(/\n/g, "<br />");
newResponseFormatted = newResponse.replace(/\*/g, "<br />");
newResponseFormatted = newResponse.replace(/\s{2,}/g, "<br />");
       
       let formattedResponse = newResponseFormatted;
       
       <p dangerouslySetInnerHTML={{ __html: formattedResponse }}></p>;
       
       for(let i=0; i<newResponseFormatted.length; i++){
        const nextWord = newResponseFormatted[i]
        delayPara(i,nextWord+'')
       }
       setloading(false)
       setinput('')
    }

    const contextValue = {
        prevPrompt,
        setprevPrompt,
        onSent,
        setresultData,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        newChat,
        setinput,
        chatHistory,
        setshowResult,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;