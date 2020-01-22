import React from 'react';
import Radar from 'react-d3-radar';
import styled from 'styled-components';
import { QuestionInterface } from '../Question'
import camelCase from 'lodash.camelcase';
import { getNumberScore } from './Assessment'

const Wrapper = styled.div`
  width: 225px;
  height: 225px;
`

const RadarGraph: React.FC<{ questions: QuestionInterface[] }> = (props) => {
  const { questions } = props

  const variables = questions.map(c => ({ key: camelCase(c.text), label: c.text }))

  const values = questions.reduce((a: any, c) => {
    a[camelCase(c.text)] = getNumberScore(c.choices)
    return a
  }, {})

  return (
    <Wrapper>
      <Radar
        width={225}
        height={225}
        padding={0}
        domainMax={4}
        highlighted={null}
        data={{
          variables,
          sets: [
            {
              key: 'me',
              label: 'My Scores',
              values
            },
          ],
        }}
      />
    </Wrapper>
  )
}

export default RadarGraph
