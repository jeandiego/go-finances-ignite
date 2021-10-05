import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

enum Colors {
  primary= 'primary',
  secondary='secondary' ,
  secondary_light= 'secondary_light',

  success='success' ,
  success_light= 'success_light',

  attention='attention' ,
  attention_light= 'attention_light',

  shape='shape' ,
  title= 'title',
  text='text',
  background= 'background',
}



interface Props extends TextProps {
  fontFamily?: string,
  size?: number,
  color?: Colors,
  children: string,
}

export const Text = styled.Text<Props>`
  font-family: ${(p) => p.theme.fonts[p.fontFamily] || p.theme.fonts.regular};
  font-size: ${(p) => p.size || 12}px;
  color: ${(p) => p.color ? p.theme.colors[p.color] : p.theme.colors.title};
`;

const GoText = ({ ...props }: Props) => {
  return <Text  {...props} />
};



export default GoText;