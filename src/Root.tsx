import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Question from './components/Question';
import Assessment from './components/assessment/Assessment';
import Header from './components/Header';
import Footer from './components/Footer';

const PREPARE = gql`
  mutation Prepare($templateId: String!) {
    prepareAssessment(templateId: $templateId)
  }
`

const ASSESSMENT = gql`
  query Assessment($id: String!) {
    assessment(id: $id) {
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
`;

const Root: React.FC = () => {
  const [step, setStep] = useState(0)
  const [assessmentId, setAssessmentId] = useState('')

  const [prepare, { loading: mutationLoading, error: mutationError }] = useMutation(PREPARE, {
    onCompleted({ prepareAssessment }) {
      setAssessmentId(prepareAssessment)
    }
  });

  const { loading, error, data } = useQuery(ASSESSMENT, {
    variables: { id: assessmentId },
  });

  useEffect(() => {
    prepare({ variables: { templateId: btoa(Math.random().toString()) }})
  }, [prepare])

  if (mutationLoading || loading) return <p>Loading...</p>;
  if (mutationError || error) return <p>Error :(</p>;

  const { questions, id, isCompleted } = assessmentId && data?.assessment

  return (
    <>
      <Header/>
        { isCompleted || step === questions.length  ?
          <Assessment questions={questions}/> :
          <Question
            assessmentId={id}
            incrementStep={() => setStep(step + 1)}
            {...questions[step]}
          />
        }
      <Footer/>
    </>
  );
}

export default Root;

