// import React, { useEffect, useState } from "react";
// import FormQuestion from "../components/FormQuestion";
// import { ReactComponent as PlusIcon } from "../img/PlusIcon.svg";
// import styled from "styled-components";
// import { nanoid } from "nanoid";
// import axios from "axios";
// import serverData from "../Data.json";

// function FormCreation() {
//   const [getData, setData] = useState([]);

//   useEffect(() => {
//     axios.get("/api/6432c8ae8ec542d5f05958d6").then((response) => {
//       setData(response.data);
//     });
//   }, []);

//   return (
//     <FormMain>
//       <FormSection>
//         <TitleInput>{getData.enqTitle}</TitleInput>

//         {getData.enqCont &&
//           getData.enqCont.map((data) => (
//             <>
//               <MainFrame>
//                 <QuestNum>질문</QuestNum>
//                 <QuesTitle>{data.qstTitle}</QuesTitle>
//                 {data.qstType == "체크박스" && (
//                   <div>
//                     <OptList>
//                       {data.options &&
//                         data.options.map((it) => (
//                           <div>
//                             <input type="radio" value={it} /> <label>{it}</label>
//                           </div>
//                         ))}
//                     </OptList>
//                   </div>
//                 )}
//               </MainFrame>
//             </>
//           ))}
//       </FormSection>
//       {/* <StyledPlusIcon onClick={addTask()} /> */}
//     </FormMain>
//   );
// }

// export default FormCreation;

// const Wrapper = styled.div`
//   display: inline-block;
//   display: table-row;
// `;

// const OptionBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   width: 80%;
//   margin: 1rem 2rem 2rem;
// `;

// const OptList = styled.div`
//   display: flex;
//   flex-direction: column;
//   font-family: "NotoSans-Regular";
//   font-size: 14px;
//   line-height: 2px;
//   margin: 1rem 2rem;
// `;

// const Btn = styled.div`
//   width: 20px;
//   height: 20px;
//   margin-left: 10px;
//   margin-top: 7px;
// `;

// const SubjOption = styled.div`
//   font-family: "NotoSans-Regular";
//   font-size: 12px;
//   color: #747474;
//   line-height: 1.5;
//   margin-top: 25px;
//   margin-left: 35px;
// `;

// // 도경 부분
// const FormMain = styled.div`
//   background: grey;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const TitleInput = styled.div`
//   width: 100%;
//   height: 1em;
//   display: block;
//   text-align: center;
//   margin-top: 1rem;
//   font-size: 3rem;
// `;

// const QuestNum = styled.div`
//   width: 5rem;
//   height: 2rem;
//   margin-top: -1rem;
//   margin-left: -0.2rem;
//   border-radius: 0.5rem;
//   background: #1a2051;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
// `;

// const MainFrame = styled.div`
//   width: 50rem;
//   height: 11rem;
//   background: #f8f8f8;
//   border: 1px solid #21296b;
//   border-radius: 20px;
//   margin-top: 4rem;
//   margin-left: 24%;
//   &:hover {
//     border: 2px solid #1a2051;
//   }
// `;

// const QuesTitle = styled.p`
//   font-size: 1.2rem;
//   margin-left: 2rem;
// `;
// const FormSection = styled.div`
//   width: 92%;
//   height: 92%;
//   overflow: auto;
//   background-color: white;
//   border-radius: 2rem 2rem 2rem 2rem;
//   overflow-y: auto;
//   &::-webkit-scrollbar {
//     display: none;
//   }
//   &::-webkit-scrollbar-thumb {
//     display: none;
//   }
// `;
