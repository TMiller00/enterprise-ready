import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import { H4 } from '../styles/Headers';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 74px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 112px;
  margin-bottom: 70px;
`

const Header: React.FC = () => (
  <Wrapper>
    <Icon text={'logo'}/>
    <H4>Enterprise Grade</H4>
  </Wrapper>
)

export default Header
