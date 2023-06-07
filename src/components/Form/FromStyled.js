import styled from "styled-components";
import Arrow from "../../img/form/Arrow.svg";

//이미지 수정
export const Trash = styled.img`
  width: 21px;
  height: 22px;
  margin-right: 10px; /* 이미지 주변에 10px 여백 추가 */
`;
export const Edit = styled.img`
  width: 21px;
  height: 22px;
  /* 이미지 주변에 10px 여백 추가 */
`;

export const Dots = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 1px;
`;

export const CheckDiv = styled.div`
  margin-top: -10px;
`;
export const CheckImg = styled.img`
  width: 50px;
  height: 50px;
  margin-top: -10px;
`;

export const Delete = styled.img`
  width: 20px;
  height: 20px; /* 이미지 주변에 10px 여백 추가 */
  margin-right: 4px;
  margin-top: 2px;
`;

export const OptionEdit = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px; /* 이미지 주변에 10px 여백 추가 */
`;
//밑부분
export const Bottom = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3em;
  margin-bottom: 1em;
`;
export const BottomRight = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
  margin-left: 30px;
  height: 30px;
  border-top: 1px solid black;
  padding-top: 1em;
`;

export const BottomLeft = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  height: 30px;
  border-top: 1px solid black;
  padding-top: 1em;
  margin-right: 30px;
`;

export const SelectOption = styled.select`
  width: 8rem;
  height: 2rem;
  margin-left: 0.4rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 2rem; /* 이미지와 텍스트 간의 간격을 설정 */
  margin-bottom: 1rem;
  margin-top: 0rem;
  appearance: none;
  background-image: url(${Arrow});
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.8rem 0.8rem;
  &:focus {
    outline: none;
  }
`;

export const TypeSelect = styled.div`
  display: inline-block;
  margin-right: 15px;
`;

export const AddOptionButton = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const OptionInput = styled.input`
  width: 10rem;
  border: none;
  &:focus {
    outline: none;
  }
  background-color: white;
  border-radius: 0.2rem;
  padding-left: 1rem;
`;

export const TagsEssen = styled.div`
  width: 45px;
  height: 30px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: black;
  font-weight: 500;
`;
export const TagsAnony = styled.div`
  width: 80px;
  height: 30px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  margin-bottom: 1em;
  margin-right: 0.5em;
  background-color: rebeccapurple;
  color: white;
  border-radius: 0.2em;
`;
export const QstTitle = styled.div`
  display: inline-block;
  width: 30rem;

  margin: 30px 200px 2px 39px;
`;

export const QstAnswer = styled.textarea`
  width: 95%;
  height: 6rem;
  border: none;
  vertical-align: top;
  margin-left: -1rem;
  outline: none;
  resize: none; /* Disable resizing */
  padding: 20px;
  font-size: 15px;
  border-radius: 10px;
`;
export const OptBox = styled.div`
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 15px;
`;

export const DelBtn = styled.div`
  margin-right: 10px;
  margin-top: 25px;
`;

export const QstFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

export const OptFrame = styled.div`
  margin-top: 0.5rem;
  margin-bottom: -1rem;
`;

export const OptionWrapper = styled.div`
  display: flex;
  width: 46rem;
  height: 1.2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  padding-top: 0.7rem;
  justify-content: space-between;
  margin-bottom: 1.4rem;
  border-top: 1px solid black;
`;

export const RightOptionWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  padding-top: -0.9rem;
  justify-content: flex-start;
`;
export const LeftOptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 20%;
  height: 100%;
`;
export const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: red;
  width: 100%;
`;
export const OptList = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "NotoSans-Regular";

  font-size: 14px;
  line-height: 2px;
  margin: 1rem 2rem;
`;

export const OptionListItem = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 3px;
`;

export const OptionListItemLeft = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: flex-start;
`;

export const OptionListItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 20%;
  align-items: center;
`;

export const OptionContent = styled.div`
  margin-left: 15px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export const Btn = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 7px;
`;

export const SubjOption = styled.div`
  font-family: "NotoSans-Regular";
  font-size: 12px;
  color: #747474;
  line-height: 1.5;
  margin-top: 25px;
  margin-bottom: 3rem;
  margin-left: 35px;
`;

export const AnswerBox = styled.div`
  font-family: "NotoSans-Regular";
  font-size: 14px;
  color: #747474;
  line-height: 1.3;
  width: 93%;
  height: 100px;
  margin-top: 10px;
  margin-left: 10px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;

  border: 1px solid black;
  border-radius: 5px;

  overflow-y: scroll;
`;

export const SubjOptionCreate = styled.div`
  font-family: "NotoSans-Regular";
  font-size: 12px;
  color: #747474;
  line-height: 1.5;
  margin-top: 25px;
  margin-left: 19px;
`;

export const QuestNum = styled.div`
  width: fit-content; /* 텍스트 길이에 따라 너비가 자동으로 조절됩니다. */
  height: 2rem;
  margin-top: -1rem;
  padding: 0rem 1.3rem 0rem 1.3rem;
  border-radius: 0.5rem;
  background: #1a2051;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -0.2rem;
  font-weight: bold;
  font-size: 15px;
  color: white;
`;

export const MainFrame = styled.form`
  display: flex;
  margin: auto;
  width: 50rem;
  height: 10rem;
  overflow: scroll;
  background: #f8f8f8;
  border: 1px solid #21296b;
  border-radius: 20px;
  margin-bottom: 3em;
  display: table;
  &:hover {
    border: 2px solid #1a2051;
  }
`;

export const MainFrameView = styled.form`
  display: flex;
  margin: auto;
  width: 50rem;
  height: 9rem;
  overflow: scroll;
  background: #f8f8f8;
  border: 1px solid #21296b;
  border-radius: 20px;
  margin-bottom: 3em;
  display: table;
  &:hover {
    border: 2px solid #1a2051;
  }
`;

export const FormButton = styled.div`
  color: #1a2051;
  &:hover {
    cursor: pointer;
  }
  font-weight: bold;
`;
export const ResponseStatus = styled.div`
  width: fit-content; /* 텍스트 길이에 따라 너비가 자동으로 조절됩니다. */
  border-radius: 0.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

export const Export = styled.div`
  width: fit-content; /* 텍스트 길이에 따라 너비가 자동으로 조절됩니다. */
  border-radius: 1rem;
  padding: 6px 13px 6px 13px;
  margin-top: -8px;
  background: white;
  border: 2px solid #1a2051;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
  color: #1a2051;
  font-weight: bold;
`;

export const ResponseNumber = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  background: #1a2051;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
  margin-left: 0.5rem;
  color: white;
  border-radius: 50%;
`;

export const QuesTitle = styled.input`
  display: inline;
  width: 30rem;
  height: 2rem;
  margin: 1rem 1rem 0.5rem 2rem;
  background-color: white;
  margin-right: 7rem;
  border: 0.5px solid black;
  outline: none;
  &:focus {
    outline: none;
  }

  padding-left: 1rem;
`;

export const AddOption = styled.img`
  margin-left: 2em;
  margin-right: 0.2em;
`;

export const AddOptionInput = styled.input`
  border: none;
  width: 100%;
  height: 30px;
  padding-left: 10px;
  font-size: 15px;
  background-color: #f8f8f8;
  &:focus {
    outline: none;
  }
`;
