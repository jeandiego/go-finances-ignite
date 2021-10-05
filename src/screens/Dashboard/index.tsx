import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

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
  HighlightCards
} from "./styles";


export function Dashboard() {

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
    </Container>
  )
}
