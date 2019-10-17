import React from "react";
import styled, { css } from "styled-components";
import { space, color, layout } from "styled-system";

const Select = styled.select`
  appearance: none;
  font-family: inherit;
  font-size: 1rem;
  padding: 12px;
  background-color: transparent;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  &:focus {
    outline: none;
    border-color: "blue";
    box-shadow: 0 0 0 1px black;
  }
  &:hover {
    outline: none;
    border-color: blue;
  }
  ::-ms-expand {
    display: none;
  }

  option:hover {
    background-color: green;
    padding: 18px;
  }

  ${space};
  ${layout};
`;

export default props => <Select {...props} />;
