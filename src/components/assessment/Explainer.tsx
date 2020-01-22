import React from 'react';
import styled from 'styled-components';
import { H3, Text } from '../../styles/Headers';
import { QuestionInterface } from '../Question'
import Grade from '../Grade'
import Icon from '../Icon';
import { NavigateNext } from '@material-ui/icons'
import { getGrade, getSelection } from './Card'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 906px;
  margin-bottom: 74px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  ${H3} {
    margin-right: 8px;
  }
`

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 708px;
`

const Answer = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #9B9B9B;
  margin-top: 0;
`

const IconWrapper = styled.div`
  width: 196px;
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 40px;

  img {
    width: 100%;
  }
`

const LearnMore = styled.a`
  font-size: 16px;
  margin-top: 10px;
  font-weight: bold;
  color: #73A3CD;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Explainer: React.FC<QuestionInterface> = (props) => {
  const { text, choices } = props
  const selection = getSelection(choices)
  const grade = getGrade(selection)

  return (
    <Wrapper>
      <IconWrapper>
        <Icon text={text}/>
      </IconWrapper>
      <AnswerSection>
        <Title>
          <H3>{ text }</H3>
          <Grade grade={grade} size={24}/>
        </Title>
        <Answer>Your Answer:</Answer>
        <Answer>{ choices[selection].text }</Answer>
        <Text>{ choices[selection].recommendation }</Text>
        <LearnMore>Learn More <NavigateNext/></LearnMore>
      </AnswerSection>
    </Wrapper>
  )
}

export default Explainer
