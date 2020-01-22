import React from 'react';
import IconMap from '../assets';
import camelCase from 'lodash.camelcase';

const Icon: React.FC<{ text: string }> = ({ text }) => {
  let icon = (IconMap as any)[camelCase(text)]

  return (
    <img src={icon} alt={text}/>
  )
}

export default Icon
