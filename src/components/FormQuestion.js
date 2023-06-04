import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import * as t from "./Form/FromStyled";
import Trash from "../img/form/trash.svg";
import Edit from "../img/form/edit.svg";
import X from "../img/form/x.svg";
import Add from "../img/form/add.svg";
import Check from "../img/form/check.svg";
import AnonyTrue from "../img/form/on.svg";
import AnonyFalse from "../img/form/off.svg";
import check_on from "../img/form/check_on.svg";
import check_false from "../img/form/check_false.svg";
function FormQuestion(props) {
  const [type, setType] = useState(props.qstType); // 질문 타입
  const [qstTitle, setQstTitle] = useState(props.qstTitle);
  const [input, setInput] = useState(""); //질문 input
  const [options, setOptions] = useState(props.options); // 질문 옵션 이미지
  const [anonymous, setAnonymous] = useState(props.anonymous); //질문 익명 여부
  const [essential, setEssential] = useState(props.essential); //질문 필수 여부
  const [isEditing, setEditing] = useState(false); // 편집 유무
  const [isEditingOptions, setEditingOptions] = useState(false); // 편집할 옵션
  const [selectedOption, setSelectedOption] = useState(null); // 옵션 선택
  const [inputEditOption, setInputEditOption] = useState(""); // 옵션 편집할 내용

  //Edit 값
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // 익명 여부
  const onToggleAnony = () => {
    setAnonymous(!anonymous);
  };

  //필수 여부
  const onToggleEssen = () => {
    setEssential(!essential);
  };

  //질문 제목 설정
  const onQstTitleChange = (e) => {
    setQstTitle(e.target.value);
  };

  //질문 타입 설정
  const selectType = (e) => {
    setType(e.target.value);
  };

  //옵션 추가
  function AddOption(e) {
    e.preventDefault();
    console.log("Success!");
    console.log(input);
    if (!input || /^\s*$/.test(input)) {
      return;
    }

    const newOption = {
      optionContent: input,
      optionId: "O-" + nanoid(),
    };

    const newOptions = [...options, newOption];

    setOptions(newOptions);
    setInput("");
  }

  //옵션 삭제
  function deleteOption(event, option) {
    event.preventDefault();
    let remainingOptions = options.filter(
      (it) => it.optionId !== option.optionId
    );
    setOptions(remainingOptions);
  }

  // 옵션 편집
  function editOption(event, option) {
    event.preventDefault();
    const editOptionList = options.map((opt) => {
      if (option.optionId === opt.optionId) {
        return {
          ...opt,
          optionContent: inputEditOption,
        };
      }
      return opt;
    });
    setInputEditOption("");
    setOptions(editOptionList);
    setEditingOptions(!isEditingOptions);
  }

  //옵션 편집상태 변경
  function setEditingOptionState(e, it) {
    e.preventDefault();
    onSetSelectedOption(e, it.optionId);
  }
  //옵션 편집할때 내용 변경
  const handleOptionEditChange = (e) => {
    setInputEditOption(e.target.value);
  };

  //옵션 편집할때마다 현재 편집되고 있는 옵션 확인
  const onSetSelectedOption = (event, optionId) => {
    event.preventDefault();
    setSelectedOption(optionId);
    setEditingOptions(!isEditingOptions);
  };

  //편집 눌렀을 때의 템플릿
  const editingTemplate = (
    <t.MainFrame>
      <t.QuestNum>질문</t.QuestNum>

      <t.QuesTitle
        type="text"
        value={qstTitle}
        placeholder="질문 제목을 입력하세요"
        onChange={onQstTitleChange}
      />

      <t.TypeSelect>
        <t.SelectOption onChange={selectType}>
          <option id="checkBox" selected={props.qstType === "체크박스"}>
            체크박스
          </option>
          <option selected={props.qstType === "객관식 질문"}>
            객관식 질문
          </option>
          <option selected={props.qstType === "서술형 질문"}>
            서술형 질문
          </option>
        </t.SelectOption>
      </t.TypeSelect>

      {type === "체크박스" && (
        <div>
          <t.OptList>
            {options.map((it, index) => (
              <t.OptionListItem key={index}>
                <t.OptionListItemLeft>
                  <input type="checkbox" value={it.optionId} />
                  {selectedOption === it.optionId && isEditingOptions ? (
                    <t.AddOptionInput
                      type="text"
                      placeholder="옵션 편집"
                      value={inputEditOption}
                      name="text"
                      onChange={handleOptionEditChange}
                    />
                  ) : (
                    <t.OptionContent>{it.optionContent}</t.OptionContent>
                  )}
                </t.OptionListItemLeft>

                <t.OptionListItemRight>
                  {selectedOption === it.optionId && isEditingOptions ? (
                    <t.OptionEdit
                      src={Check}
                      alt="Check"
                      onClick={(event) => editOption(event, it)}
                    />
                  ) : (
                    <t.OptionEdit
                      src={Edit}
                      alt="Edit"
                      onClick={(event) => setEditingOptionState(event, it)}
                    />
                  )}
                  <t.Delete
                    src={X}
                    alt="x"
                    onClick={(event) => deleteOption(event, it)}
                  />
                </t.OptionListItemRight>
              </t.OptionListItem>
            ))}
          </t.OptList>
          <t.OptionListItem>
            <t.OptionListItemLeft>
              <t.AddOption src={Add} alt="Add" onClick={AddOption} />

              <t.AddOptionInput
                type="text"
                placeholder="옵션"
                value={input}
                name="text"
                onChange={handleChange}
              />
            </t.OptionListItemLeft>
          </t.OptionListItem>
        </div>
      )}

      {type === "객관식 질문" && (
        <div>
          <t.OptList>
            {options.map((it, index) => (
              <t.OptionListItem key={index}>
                <t.OptionListItemLeft>
                  <input type="radio" value={it.optionId} />
                  {selectedOption === it.optionId && isEditingOptions ? (
                    <t.AddOptionInput
                      type="text"
                      placeholder="옵션을 입력하세요"
                      value={inputEditOption}
                      name="text"
                      onChange={handleOptionEditChange}
                    />
                  ) : (
                    <t.OptionContent>{it.optionContent}</t.OptionContent>
                  )}
                </t.OptionListItemLeft>
                <t.OptionListItemRight>
                  {selectedOption === it.optionId && isEditingOptions ? (
                    <t.OptionEdit
                      src={Check}
                      alt="Check"
                      onClick={(event) => editOption(event, it)}
                    />
                  ) : (
                    <t.OptionEdit
                      src={Edit}
                      alt="Edit"
                      onClick={(event) => setEditingOptionState(event, it)}
                    />
                  )}
                  <t.Delete
                    src={X}
                    alt="x"
                    onClick={(event) => deleteOption(event, it)}
                  />
                </t.OptionListItemRight>
              </t.OptionListItem>
            ))}
          </t.OptList>
          <t.OptionListItem>
            <t.OptionListItemLeft>
              <t.AddOption src={Add} alt="Add" onClick={AddOption} />

              <t.AddOptionInput
                type="text"
                placeholder="옵션"
                value={input}
                name="text"
                onChange={handleChange}
              />
            </t.OptionListItemLeft>
          </t.OptionListItem>
        </div>
      )}

      {type === "서술형 질문" && (
        <t.SubjOption>
          텍스트
          <hr align="left" size="1" width="570px" color="gray" />
        </t.SubjOption>
      )}

      <t.OptionWrapper>
        <t.RightOptionWrapper>
          <t.TagsEssen>익명</t.TagsEssen>
          {anonymous ? (
            <t.CheckImg src={AnonyTrue} alt="Edit" onClick={onToggleAnony} />
          ) : (
            <t.CheckImg src={AnonyFalse} alt="Edit" onClick={onToggleAnony} />
          )}

          <t.TagsEssen>필수</t.TagsEssen>
          {essential ? (
            <t.CheckImg src={AnonyTrue} alt="Edit" onClick={onToggleEssen} />
          ) : (
            <t.CheckImg src={AnonyFalse} alt="Edit" onClick={onToggleEssen} />
          )}
        </t.RightOptionWrapper>
        <t.LeftOptionWrapper>
          <t.OptionEdit
            src={Check}
            alt="Check"
            onClick={() => {
              props.editTask(
                props.qstId,
                qstTitle,
                type,
                options,
                anonymous,
                essential
              );
              setEditing(false);
            }}
          />
        </t.LeftOptionWrapper>
      </t.OptionWrapper>
    </t.MainFrame>
  );

  // 편집하지 않을때의 상태
  const viewTemplate = (
    <t.MainFrameView>
      <t.QuestNum>
        {props.branch && props.branchQst !== "" && props.branchOpt !== "" ? (
          <>
            질문 {props.qstNum + " "}(
            {props.branchQstIndex !== 0
              ? `${props.branchQstIndex}-`
              : "부모 삭제됨 -"}
            {
              props.qstArr[props.branchQstIndex - 1]?.options?.find(
                (option) => option.optionId === props.branchOpt
              )?.optionContent
            }
            )
          </>
        ) : (
          "질문 " + props.qstNum
        )}
      </t.QuestNum>
      <t.QstFrame>
        <t.QstTitle>{props.qstTitle}</t.QstTitle>
      </t.QstFrame>
      <t.OptList>
        {props.qstType === "체크박스" &&
          props.options.map((it, index) => (
            <t.OptionListItem key={index}>
              <input type="checkbox" value={it} />
              <t.OptionContent>{it.optionContent}</t.OptionContent>
            </t.OptionListItem>
          ))}
        {props.qstType === "객관식 질문" &&
          props.options.map((it, index) => (
            <t.OptionListItem key={index}>
              <input type="radio" value={it} />
              <t.OptionContent>{it.optionContent}</t.OptionContent>
            </t.OptionListItem>
          ))}

        {props.qstType === "서술형 질문" && (
          <t.SubjOptionCreate>
            텍스트
            <hr align="left" size="1" width="570px" color="gray" />
          </t.SubjOptionCreate>
        )}
      </t.OptList>

      <t.Bottom>
        <t.BottomRight>
          {props.anonymous ? (
            <>
              <t.TagsEssen>익명</t.TagsEssen>
              <t.CheckImg src={AnonyTrue} alt="" />
            </>
          ) : (
            <>
              <t.TagsEssen>익명</t.TagsEssen>
              <t.CheckImg src={AnonyFalse} alt="" />
            </>
          )}
          {props.essential ? (
            <>
              <t.TagsEssen>필수</t.TagsEssen>
              <t.CheckImg src={AnonyTrue} alt="" />
            </>
          ) : (
            <>
              <t.TagsEssen>필수</t.TagsEssen>
              <t.CheckImg src={AnonyFalse} alt="" />
            </>
          )}
        </t.BottomRight>
        <t.BottomLeft>
          <t.Trash
            src={Trash}
            alt="Trash"
            onClick={() => props.deleteTask(props.qstId, props.qstNum)}
          />

          <t.Edit src={Edit} alt="Edit" onClick={() => setEditing(true)} />
        </t.BottomLeft>
      </t.Bottom>
    </t.MainFrameView>
  );

  return <>{isEditing ? editingTemplate : viewTemplate}</>;
}

export default FormQuestion;
