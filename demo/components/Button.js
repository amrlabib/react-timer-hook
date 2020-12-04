import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #73D1FE;
  border-radius: 5;
  margin: 0 5px 0 5px;
  outline: none;
  border: none;
  padding: 5px 10px;
  color: white;
`;

export default function Button(props) {
  return (
    <StyledButton {...props} />
  );
}
