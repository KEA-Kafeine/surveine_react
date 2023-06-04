import React from "react";
import styled from "styled-components";
import PlusIcon from "../../img/PlusIcon.svg";
import { Link } from "react-router-dom";

function CboxBlank({cboxId}) {
  return (
    <>
      <Wrapper>
        <Text>Create your first SurVeine</Text>
        <br />
        <Link to={`/create/${cboxId}`}>
          <StyledPlusIcon src={PlusIcon} />
        </Link>
      </Wrapper>
    </>
  );
}
export default CboxBlank;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  color: #000000;
  margin-top: 10rem;
`;

const StyledPlusIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
