import React from "react";
import styled from "styled-components";

export function SboxBlank() {
    return (
        <>
        <Wrapper>
            There is no template.
        </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    color: #000000;
    margin-top: 13rem;
`;