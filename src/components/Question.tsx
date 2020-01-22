import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { NavigateNext } from '@material-ui/icons'

const UPDATE_ASSESSMENT = gql`
  mutation UpdateAssessment($assessmentId: String, $questionId: String!, $selectedChoiceId: String!) {
    updateAssessment(assessmentId: $assessmentId, questionId: $questionId, selectedChoiceId: $selectedChoiceId) {
      id,
      isCompleted,
      questions {
        id,
        text,
        description,
        question,
        choices {
          id,
          text,
          recommendation,
          isSelected
        }
      }
    }
  }
`

interface AssessmentInterface {
  id: string;
  isCompleted: boolean;
  questions: QuestionInterface[];
}

export interface QuestionInterface {
  id: string;
  text: string;
  description: string;
  question: string;
  choices: ChoiceInterface[];
}

interface QuestionProps {
  assessmentId: string;
  incrementStep: () => void;
}

export interface ChoiceInterface {
  id: string;
  text: string;
  recommendation: boolean;
  isSelected: boolean;
}

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: HelveticaNeue;
  width: 661px;
  height: 687px;
  background: #FFFFFF;
  color: #323232;
  border: 1.5px solid #E2E2E2;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 66px 68px;
  box-shadow:
    11px 14px 0 -2px #FFFFFF,
    11px 14px 0 #E2E2E2,
    22px 25px 0 -2px #FFFFFF,
    22px 25px 0 #E2E2E2;
  margin: 0 auto;
`

const QuestionTitle = styled.div`
  font-size: 22px;
  line-height: 26px;
  font-weight: bold;
`

const QuestionText = styled.div`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`

const ChoiceID = styled.div`
  flex: 0 0 auto;
  height: 22px;
  width: 22px;
  font-size: 14px;
  text-align: center;
  border-radius: 22px;
  line-height: 22px;
  color: #73A3CD;
  background: #EAF1F8;
  margin-right: 18px;
  text-transform: uppercase;
`

const Highlight = css`
  background: rgba(234, 241, 248, 0.5);
  border: 1px solid #73A3CD;
  box-sizing: border-box;
  border-radius: 4px;

  ${ChoiceID} {
    background: #73A3CD;
    color: #FFFFFF;
  }
`

const Choice = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  line-height: 19px;
  border: 1px solid #DFDFDF;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 18px 24px 18px 18px;
  cursor: pointer;

  &:hover {
    ${Highlight}
  }

  ${(props: any) => props.selected && Highlight}
`

const Next = styled.div`
  display: flex;
  align-items: center;
  font-family: HelveticaNeue;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #EE5042;
  cursor: pointer;
`

const Question: React.FC<QuestionInterface & QuestionProps> = (props) => {
  const { id, text, description, question, choices, assessmentId, incrementStep } = props
  const [updateAssessment] = useMutation(UPDATE_ASSESSMENT);

  return (
    <QuestionBox>
      <QuestionTitle>{ text }</QuestionTitle>
      <QuestionText>{ description } { question }</QuestionText>
      { choices.map((choice: ChoiceInterface, i: number) => {
        return (
          <Choice
            key={i}
            onClick={() => updateAssessment({ variables: { assessmentId: assessmentId, questionId: id, selectedChoiceId: choice.id }})}
            selected={choice.isSelected}
          >
            <ChoiceID>{ choice.id.split('').pop() }</ChoiceID>{ choice.text }
          </Choice>
        )})
      }
      <Next onClick={incrementStep}>
        Next <NavigateNext/>
      </Next>
    </QuestionBox>
  );
}

export default Question;
