import React from "react";
import styled, { css } from "styled-components";
import Error from "../Error";
import { space, color, layout } from "styled-system";

export default function FormField(props) {
  const { label, error, children, ...rest } = props;

  const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const Label = styled.label`
    display: inline;
    font-weight: ${props => props.theme.fontWeights.bold};
  `;

  return (
    <FieldWrapper>
      {label && <Label>{label}</Label>}
      {children}
      <Error>{error}&nbsp;</Error>
    </FieldWrapper>
  );
}
