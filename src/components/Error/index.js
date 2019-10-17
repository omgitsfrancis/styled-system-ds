import React from "react";
import styled, { css } from "styled-components";
import { space, color, layout } from "styled-system";

const Error = styled.span`
  color: ${props => props.theme.colors.danger};
  text-align: end;
`;

export default props => <Error {...props} />;

