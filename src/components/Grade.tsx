import React from 'react';
import styled from 'styled-components';
import colors from '../styles/Colors';

const CircleScore = styled.div`
  flex: 0 0 auto;
  font-size: ${({ size }: any) => size ? 16 : 50}px;
  line-height: ${({ size }: any) => size || 82}px;
  text-align: center;
  color: #FFFFFF;
  width: ${({ size }: any) => size || 82}px;
  height: ${({ size }: any) => size || 82}px;
  background-color: ${({ color }: any) => colors[color]};
  border-radius: 50%;
  font-weight: bold;
  text-transform: uppercase;
`

const Grade: React.FC<{ grade?: string, size?: number }> = ({ grade, size }) => (
  <CircleScore color={grade} size={size}>{ grade }</CircleScore>
)

export default Grade
