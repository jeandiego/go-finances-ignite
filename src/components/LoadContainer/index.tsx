import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'styled-components';
import styled from "styled-components/native";


export const Container = styled.View`
  background: ${({theme}) => theme.colors.shape};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.ActivityIndicator`
  color: ${({theme}) => theme.colors.shape};
`;

const LoadContainer: React.FC = () => {
  const theme = useTheme();

  return (
  <Container>
    <ActivityIndicator color={theme.colors.secondary} />
  </Container>
  );
}

export default LoadContainer;
