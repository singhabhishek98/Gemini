import { useRef, useEffect, useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../context/Context";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
  } = useContext(Context);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="main">
      <div className="nav">
        <img src={assets.gemini_icon} className="gemini-image-icon" alt="Gemini Logo" />
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Abhi</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => setinput("Suggest beautiful places to visit in India")}>
                <p>Suggest beautiful places to visit in India</p>
                <img src={assets.compass_icon} />
              </div>
              <div className="card" onClick={() => setinput("Briefly summarize this concept: urban planning")}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} />
              </div>
              <div className="card" onClick={() => setinput("Brainstorm team bonding activities for our work retreat")}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} />
              </div>
              <div className="card" onClick={() => setinput("Improve the readability of the following code")}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <p>{recentPrompt}</p>
              <img src={assets.user_icon} />
            </div>
            <div className="result-data">
              <img src={assets.favicon} />
              {loading ? (
                <div className="loader">
                  <hr /><hr /><hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => setinput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  onSent();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} />
              <img src={assets.mic_icon} />
              {input && <img onClick={onSent} src={assets.send_icon} />}
            </div>
          </div>
          <p className="bottom-info">
          Gemini can make mistakes, so double-check it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
