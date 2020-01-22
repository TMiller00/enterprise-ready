import React from 'react';
import styled from 'styled-components';
import { H1, H2, SubTitle, Text } from '../../styles/Headers';
import { FlexRow, FlexColumn } from '../../styles/Flex';
import { QuestionInterface, ChoiceInterface } from '../Question'
import RadarGraph from './RadarGraph'
import Card from './Card'
import Explainer from './Explainer'
import Grade from '../Grade'

const Results = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 75px;
`

const ResultBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 496px;
  height: 310px;
`

const CloserLook = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 802px;
  margin: 0 auto;
`

const Cards = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 112px;

  &:after {
    content: '';
    flex: 0 0 22%;
  }
`

const CloserLookHeader = styled(FlexColumn)`
  margin-bottom: 56px;
  text-align: center;
`

const getLetterGrade = (score: number): string => {
  if (score >= 0.90) {
    return 'a'
  }

  if (score >= 0.80 && score < 0.90) {
    return 'b'
  }

  if (score >= 0.70 && score < 0.80) {
    return 'c'
  }

  if (score >= 0.60 && score < 0.70) {
    return 'd'
  }

  return 'f'
}

export const getNumberScore = (choices: ChoiceInterface[]) => {
  const selection = choices.findIndex((a: any) => a.isSelected === true)
  return selection === -1 ? choices.length : selection + 1
}

const Assessment: React.FC<{ questions: QuestionInterface[] }> = (props) => {
  const { questions } = props

  let sum = questions.reduce((a, c) => {
    let selection = getNumberScore(c.choices)
    return a + selection
  }, 0) / (questions.length * 4)

  let grade = getLetterGrade(sum)

  return (
    <>
      <Results>
        <RadarGraph questions={questions}/>
        <ResultBanner>
          <FlexRow>
            <H1>Here is your Enterprise Grade</H1>
            <Grade grade={grade}/>
          </FlexRow>
          <SubTitle>Awesome! You’re already taking important steps towards becoming EnterpriseReady.</SubTitle>
          <Text>This is some text with a better summary about what your answers mean and how you can be more EnterpriseReady.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</Text>
        </ResultBanner>
      </Results>
      <CloserLook>
        <CloserLookHeader>
          <H2>Let’s take a closer look at your scores</H2>
          <SubTitle>Select a category below to get a more detailed view of your scores, as well as next steps on becoming more EnterpriseReady.</SubTitle>
        </CloserLookHeader>
        <Cards>
          { questions.map((question: QuestionInterface, i: number) => <Card key={i} {...question}/>)}
        </Cards>
        { questions.map((question: QuestionInterface, i: number) => <Explainer key={i} {...question}/>)}
      </CloserLook>
    </>
  )
}

export default Assessment
