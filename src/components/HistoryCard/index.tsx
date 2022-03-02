import React from 'react';
import { View } from 'react-native';
import { Container, Title, Amount } from './styles';

interface IProps {
  title: string;
  amount: string;
  color: string;
}

const HistoryCard = ({ title, amount, color }: IProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>

  )
}

export default HistoryCard;
