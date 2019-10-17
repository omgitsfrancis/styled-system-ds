import React from "react";
import styled, { css } from "styled-components";
import { space, color, layout } from "styled-system";

const Input = styled.input`
  font-size: ${props => props.theme.fontSizes[4]};
  border-radius: ${props => props.theme.radius.medium};
  border: solid 2px ${props => props.theme.colors.midGray};
  padding: ${props => props.theme.space[3]};
  &:hover {
    border-color: ${props => props.theme.colors.info};
  }
  ${layout};
  ${space};
  ${color};
`

export default props => <Input {...props} />;
