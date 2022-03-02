
import React from 'react';
import { Text } from 'react-native';

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles';

export interface IHightlightProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: `up` | `down` | `total`;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
}


export function HighlightCard({type, title, amount, lastTransaction}: IHightlightProps) {
  return (
  <Container type={type}>
    <Header>
      <Title type={type}>{title}</Title>
      <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
  </Container>);
}




