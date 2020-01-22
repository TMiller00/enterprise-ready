import React from 'react';
import styled from 'styled-components';
import { H5 } from '../../styles/Headers';
import { QuestionInterface, ChoiceInterface } from '../Question'
import Icon from '../Icon'
import colors from '../../styles/Colors'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 auto;
  width: 178px;
  height: 98px;
  padding: 15px 20px;
  margin-bottom: 30px;
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: rgba(234, 241, 248, 0.5);
    border: 1px solid #73A3CD;
    box-sizing: border-box;
    border-radius: 4px;
  }
`

const Title = styled(H5)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Grade = styled.h2`
  font-size: 32px;
  line-height: 37px;
  color: ${({ color }: any) => colors[color]};
  margin: 0;
  text-transform: uppercase;
`

const IconAndGrade = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 42px;
  }
`

export const getSelection = (choices: ChoiceInterface[]) => {
  const selection = choices.findIndex((a: any) => a.isSelected === true)
  return selection === -1 ? choices.length - 1 : selection
}

export const getGrade = (selection: number) => {
  switch(selection) {
    case 3:
      return 'a'
    case 2:
      return 'b'
    case 1:
      return 'c'
    case 0:
      return 'd'
    default:
      return 'a'
  }
}

const Card: React.FC<QuestionInterface> = (props) => {
  const { text, choices } = props
  const selection = getSelection(choices)
  const grade = getGrade(selection)

  return (
    <Wrapper>
      <Title>{ text }</Title>
      <IconAndGrade>
        <Icon text={text}/>
        <Grade color={grade}>{ grade }</Grade>
      </IconAndGrade>
    </Wrapper>
  )
}

export default Card
