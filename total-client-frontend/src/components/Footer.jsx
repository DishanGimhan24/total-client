import React from "react";
import styled from "styled-components";

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const FooterItem = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.span};
    color: ${({ theme }) => theme.colors.light};
    text-align: center;
`;

const Footer = () => {

    const date = new Date().getFullYear();

    return (
        <Main>
            <FooterItem>© {date} Total Client</FooterItem>
            <FooterItem>All Rights Reserved.</FooterItem>
            <FooterItem>Powered by Aradhana.</FooterItem>
        </Main>
    );
};

export default Footer;