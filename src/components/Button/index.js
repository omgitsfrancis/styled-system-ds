import React from "react";
import styled, { css } from "styled-components";
import { space, color } from "styled-system";

const handleButtonSize = size => {
  switch (size) {
    case "small":
      return css`
        font-size: ${props => props.theme.fontSizes[0]};
      `;
    case "large":
      return css`
        font-size: ${props => props.theme.fontSizes[5]};
      `;
    default:
      return css`
        font-size: ${props => props.theme.fontSizes[3]};
      `;
  }
};

const Button = styled.button`
  background-color: ${props => props.theme.colors.links};
  color: ${props => props.theme.colors.lightText};
  border: none;
  border-radius: ${props => props.theme.radius.medium};
  padding: ${props => props.theme.space[4]};

  &:hover {
    background-color: ${props => props.theme.colors.danger};
  }
  
  ${props => handleButtonSize(props.size)}

  ${space};
  ${color};
`;

export default props => <Button {...props} />;
