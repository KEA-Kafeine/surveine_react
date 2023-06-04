import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

function QstOptions({ qstType }) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("체크박스");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  function AddOption() {
    console.log("Success!");
    console.log(input);
    if (!input || /^\s*$/.test(input)) {
      return;
    }

    const newOptions = [...options, input];

    setOptions(newOptions);
    setInput("");
  }

  // const opt = "옵션1"

  //타입 설렉트

  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    <>
      <Wrapper>
        <div>
          {qstType == "체크박스" && (
            <div>
              {options.map((it) => (
                <OptList>
                  <input type="checkbox" value={it} /> <label>{it}</label>
                </OptList>
              ))}
              
              {/* <OptionBox>
                <br />
                <br />
                <input
                  type="text"
                  placeholder="옵션"
                  value={input}
                  name="text"
                  onChange={handleChange}
                />
                <Btn>
                  <button onClick={AddOption}>+</button>
                </Btn>
              </OptionBox> */}
            </div>
          )}

          {qstType == "객관식 질문" && (
            <div>
              {options.map((it) => (
                <OptList>
                  <input type="radio" value={it} /> <label>{it}</label>
                </OptList>
              ))}

              {/* <OptionBox>
                <br />
                <br />
                <input
                  type="text"
                  placeholder="옵션"
                  value={input}
                  name="text"
                  onChange={handleChange}
                />
                <Btn>
                  <button onClick={AddOption}>+</button>
                </Btn>
              </OptionBox> */}
            </div>
          )}

          {qstType == "서술형 질문" && (
            <SubjOption>
              텍스트
              <hr align="left" size="1" width="650px" color="gray" />
            </SubjOption>
          )}
        </div>
      </Wrapper>
    </>
  );
}
export default QstOptions;

const Wrapper = styled.div`
  display: inline-block;
  display: table-row;
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 15px;
  margin-bottom: 10px;
`;

const OptList = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "NotoSans-Regular";
  font-size: 14px;
  line-height: 2px;
  margin-left: 20px;
  margin-bottom: 15px;
`;

const Btn = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const SubjOption = styled.div`
  font-family: "NotoSans-Regular";
  font-size: 12px;
  color: #747474;
  line-height: 1.5;
  margin-top: 25px;
  margin-left: 30px;
`;

const TypeSelect = styled.div`
  display: inline-block;
`;