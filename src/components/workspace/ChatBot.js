import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import chatbot from "../../img/chatbot.png";
import { ReactComponent as DefaultProfile } from "../../img/33242.svg";
import axios from "axios";
const ChatBot_Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1c2534;
  display: block;
  justify-content: center;
  margin: 4em;
  border-radius: 1em;
`;

const ChatBot_Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChatBot_Title = styled.h1`
  color: #f9f9f9;
  margin-top: 1.8em;
  margin-left: 3em;
  font-size: 1em;
`;

const InputField = styled.div`
  width: 30em;
  height: 100%;
  display: inline;
  text-align: center;
  font-size: 1rem;
  border-radius: 0.4rem;
  margin-right: 4em;
`;

const UserField = styled.div`
  width: 70%;
  height: 60%;
  display: inline-block;
  text-align: center;
  font-size: 1rem;
  border-radius: 0.4rem;
  margin-left: 2em;
`;

const ChatBotAnswer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
`;

const UserAnswer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #d9e9fc;
  border: 0.05px solid white;
`;

const UserInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: #1c2534;
  border-radius: 1em;
`;

const DefaultProfileSet = styled(DefaultProfile)`
  width: 3.5em;
  height: 3.5em;
  display: "inline-block";
  margin: 0em 2em;
`;

const ChatBotContainer = styled.div`
  width: 80px;
  height: 100%;
  border-radius: 50px;
  background-color: aqua;
`;

const style = {
  color: "white",
  fontSize: "1.5em",
  display: "flex",
  margin: "1em",
};

const Chatbotstyle = {
  width: "2.7em",
  height: "2.7em",
  display: "lnline-block",
  margin: "1.7em",
};

const TitleField = styled.input`
  width: 80%;
  height: 2em;
  display: inline-block;
  text-align: center;
  font-size: 1rem;
  border-radius: 0.3em;
  position: relative;
  bottom: 0;
  background-color: #404150;
  border: none;
  &:focus {
    outline: none;
  }
  color: white;
`;

const Send = styled(FiSend)`
  fill: aliceblue;
  padding-left: 1em;
  color: white;
`;
const ChatLog = styled.div`
  width: 100%;
  height: 65%;
  overflow: scroll;

  /* ::-webkit-scrollbar은 WebKit 엔진을 사용하는 브라우저에서만 동작합니다. */
  ::-webkit-scrollbar {
    width: 0px; /* 스크롤바의 너비를 0으로 지정하여 숨깁니다. */
    height: 0px;
  }
`;

function ChatBot() {
  const [message, setMessage] = useState("");
  const [showChatBot, setShowChatBot] = useState(true);
  const [userInput, setUserInput] = useState([]);
  const [userInputText, setUserInputText] = useState("");
  const [prevScrollBottom, setPrevScrollBottom] = useState(null);
  const [gptAnswer, setGptAnswer] = useState([]);
  const [data, setData] = useState(null);
  const messagesEndRef = useRef(null);

  const [isHide, setIsHide] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userInput]);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8080/recommend/template", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [userInput]);

  const getGPTAnswer = () => {
    if (data != null) {
      setUserInput([...userInput, data.isSuccess]);
    }
  };

  useEffect(() => {
    if (data != null) {
      setGptAnswer([...gptAnswer, data.result.recommend]);
    }
  }, [userInput]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        axios
          .post("/api/template", {
            prompt: userInputText,
          })
          .then((response) =>
            setGptAnswer([...gptAnswer, response.data.result.recommend])
          );
        // const response = await axios.post(
        //   "/api/template",
        //   {
        //     prompt : userInputText
        //   }
        // );
        // setGptAnswer([...gptAnswer, response.data.result.recommend]);
      } catch (error) {
        console.error(error);
      }

      setUserInputText("");
    };
  }, [userInput]);

  const sendRequest = async () => {
    setUserInput([...userInput, userInputText]);
    try {
      axios
        .post("/api/template", {
          prompt: userInputText,
        })
        .then(
          (response) =>
            setGptAnswer([...gptAnswer, response.data.result.recommend])
          // const response = await axios.post(
        );

      //   "/api/template",
      //   {
      //     prompt : userInputText
      //   }
      // );
      // setGptAnswer([...gptAnswer, response.data.result.recommend]);
    } catch (error) {
      console.error(error);
    }
    console.log(gptAnswer);
    setUserInputText("");
  };

  const userInputSave = (e) => {
    setUserInputText(e.target.value);
  };

  const handleShowChatBot = (e) => {
    setShowChatBot(!showChatBot);
  };

  const onKeyPressd = (e) => {
    if (e.key === "Enter") {
      sendRequest();
    }
  };

  const RefExample = () => {
    const scrollRef = useRef();

    return <div ref={scrollRef}>{}</div>;
  };

  return (
    <ChatBot_Wrapper>
      <ChatBot_Header>
        <ChatBot_Title>Surveine Bot</ChatBot_Title>
        <AiOutlineClose onClick={handleShowChatBot} style={style} />
      </ChatBot_Header>

      <ChatLog>
        <div>
          {userInput.map((item, index) => {
            // 입력 값이 있는 경우
            return (
              <div key={index} ref={messagesEndRef}>
                <UserAnswer>
                  <DefaultProfileSet />
                  <InputField>
                    <p>{item}</p>
                  </InputField>
                </UserAnswer>

                {gptAnswer[index] && ( // GPT 대답 값이 있는 경우에만 렌더링
                  <ChatBotAnswer>
                    <img src={chatbot} style={Chatbotstyle} />
                    <InputField>
                      <p>{gptAnswer[index]}</p>
                    </InputField>
                  </ChatBotAnswer>
                )}
              </div>
            );
          })}
        </div>
      </ChatLog>
      <UserInput>
        <TitleField
          value={userInputText}
          onChange={userInputSave}
          onKeyPress={onKeyPressd}
        />
        <Send onClick={sendRequest} />
      </UserInput>
    </ChatBot_Wrapper>
  );
}

export default ChatBot;
