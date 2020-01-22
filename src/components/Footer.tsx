import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 85px;
  background: #012E4B;
  margin-top: 136px;
`

const Footer: React.FC = () => (
  <Wrapper>
    <Icon text={'footerLogo'}/>
  </Wrapper>
)

export default Footer
