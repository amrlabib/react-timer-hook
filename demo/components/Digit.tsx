import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  &: first-child {
    margin-left: 0;
  }
`;

const Title = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
`;

const DigitContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const SingleDigit = styled.span`
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 30px;
  background-color: #404549;
  border-radius: 5px;
  padding: 10px 12px;
  color: white;
  margin-right: 2px;
  &:last-child {
    margin-right: ;
  }
  &:after {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 50%;
    bottom: 50%;
    content: "";
    width: '100%';
    height: 2px;
    background-color: #232323;
    opacity: 0.4;
  }
`;

type DigitType = {
  value: number,
  title: string,
  isMIlliseconds?: boolean;
};

export default function Digit({ value, title, isMIlliseconds }: DigitType) {
  const digits = value.toString().padStart(4, '0');
  return (
    <Container>
      <Title>{title}</Title>
      <DigitContainer>
        {isMIlliseconds ?
          <>
            <SingleDigit>
              {digits[0]}
            </SingleDigit>
            <SingleDigit>
              {digits[1]}
            </SingleDigit>
          </>
          : 
          null
        }
        <SingleDigit>
          {digits[2]}
        </SingleDigit>
        <SingleDigit>
          {digits[3]}
        </SingleDigit>
      </DigitContainer>
    </Container>
  );
}
