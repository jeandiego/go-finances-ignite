import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export interface DataListProps extends TransactionCardProps{
  id: string;
}


export function Dashboard() {
  const data: DataListProps[] = [
    {
    id: "1",
    type: "positive",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign"
    },
    date: "13/04/2020"
  },
    {
    id: "2",
    type: "negative",
    title: "Aluguel do apartamento",
    amount: "R$ 900,00",
    category: {
      name: "Alimentaçao",
      icon: "coffee"
    },
    date: "13/04/2020"
  },
    {
    id: "3",
    type: "negative",
    title: "Despesa qualquer",
    amount: "R$ 1.200,00",
    category: {
      name: "Casa",
      icon: "shopping-bag"
    },
    date: "13/04/2020"
  },
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo
          source={{uri: `https://avatars.githubusercontent.com/u/60490701?v=4`}}/>
          <User>
            <UserGreeting>Ola</UserGreeting>
            <UserName>Jean Diego</UserName>
          </User>
        </UserInfo>
        <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
         title="Entradas"
         amount="R$ 17.400,00"
         lastTransaction="Ultima entrada dia 13 de abril"
         type="up"
         />
        <HighlightCard
         title="Saídas"
         amount="R$ 17.400,00"
         lastTransaction="Ultima entrada dia 13 de abril"
         type="down"
         />
        <HighlightCard
         title="Total"
         amount="R$ 17.400,00"
         lastTransaction="Ultima entrada dia 13 de abril"
         type="total"
         />

      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item})=>
            <TransactionCard data={item}/>
          }
        />
      </Transactions>
    </Container>
  )
}
