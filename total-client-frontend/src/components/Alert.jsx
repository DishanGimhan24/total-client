import React from "react";
import styled from "styled-components";

const Success = styled.div`
  background-color: ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.h6};
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;

const Danger = styled.div`
    background-color: ${(props) => props.theme.colors.danger};
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h6};
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
`;

const Warning = styled.div`
    background-color: ${(props) => props.theme.colors.warning};
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h6};
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const Alert = ({type, message}) => {
    return(
        <Container>
            {type === "success" && <Success>{message}</Success>}
            {type === "danger" && <Danger>{message}</Danger>}
            {type === "warning" && <Warning>{message}</Warning>}
        </Container>
    )
};

export default Alert;