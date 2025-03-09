import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  border-radius: 5;
  margin: 0 10px 0 0px;
  outline: none;
  border: none;
  padding: 6px 14px;
  color: #404549;
  border-radius: 3px;
  border: solid 1px #404549;
  &: hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2);
    cursor: pointer;
  }
`;

export default function Button(props) {
  return (
    <ButtonStyled {...props} />
  );
}
