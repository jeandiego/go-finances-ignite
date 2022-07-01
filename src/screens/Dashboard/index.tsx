import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { HighlightCard, IHightlightProps } from "../../components/HighlightCard";
import LoadContainer from "../../components/LoadContainer";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { transactionKey } from "../../constants/storage";
import { useAuth } from "../../hooks/useAuth";
import { currencyFormat } from "../../utils/currencyUtils";
import { dateFormat } from "../../utils/dateUtils";

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
  LogoutButton,
} from "./styles";

export interface DataListProps extends TransactionCardProps{
  id: string;
}


export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightValues, setHighlightValues] = useState<IHightlightProps[]>([]);
  const { user, signOut } = useAuth();

  const userPhoto = user.photo || `https://ui-avatars.com/api/?name=${user.name}&length=1`

  const getLastTransactionDate = useCallback((collection: DataListProps[], type: 'positive' | 'negative') => {
    const lastTransactionDate = new Date(Math.max.apply(Math, collection
      .filter((transaction) => transaction.type === type)
      .map(_transaction => new Date(Date.parse(_transaction.date)).getTime())));

    const day = lastTransactionDate.getDate();
    const month = lastTransactionDate.toLocaleString('pt-BR', { month: 'long'} );
    if (!day || !month) return '';

    return `${day} de ${month}`;
    },
  [],
);

const loadTransactions = async () => {
  setLoading(true);
  const response = await AsyncStorage.getItem(transactionKey);
  const transactions = response ? JSON.parse(response) : [];

  let entriesTotal = 0;
  let expensiveTotal = 0;

  const transactionsFormatted: DataListProps[] = transactions
  .map((item : DataListProps) => {
    if (item.type === 'positive') {
      entriesTotal += Number(item.amount)
    } else {
      expensiveTotal += Number(item.amount)
    }

    const amount = currencyFormat(Number(item.amount));
    const date = dateFormat(item.date)

  return { ...item, amount, date }
  })

  setData(transactionsFormatted ?? []);

  const lastTransactionEntriesDate = getLastTransactionDate(transactions, 'positive');
  const lastTransactionExpensiveDate = getLastTransactionDate(transactions, 'negative');
  const totalInterval = `01 a ${lastTransactionExpensiveDate}`;

  console.log(typeof lastTransactionEntriesDate.length)

  setHighlightValues([
    {
      title: 'Entradas',
      amount: String(currencyFormat(entriesTotal)),
      lastTransaction: lastTransactionEntriesDate ? `Ultima entrada dia ${lastTransactionEntriesDate}` : 'Não há transações',
      type: 'up'
    },
    {
      title: "Saídas",
      amount: String(currencyFormat(expensiveTotal)),
      lastTransaction: lastTransactionExpensiveDate ? `Ultima saída dia ${lastTransactionExpensiveDate}` : 'Não há transações',
      type: 'down'
    },
    {
      title: "Total",
      amount: String(currencyFormat(entriesTotal - expensiveTotal)),
      lastTransaction: lastTransactionExpensiveDate ? totalInterval : 'Não há transações',
      type: 'total'
  }])

    setLoading(false);
}

useFocusEffect(useCallback(() => {
  loadTransactions();
} , []))

  return (
    <Container>
      {loading  ?
        <LoadContainer />
        :
      <>
        <Header>
          <UserWrapper>
          <UserInfo>
            <Photo
            source={{uri: userPhoto  }}/>
            <User>
              <UserGreeting>Ola</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
          </UserWrapper>
        </Header>
        <HighlightCards>
        {highlightValues.map(
            ({ title, amount, lastTransaction, type }) =>
            <HighlightCard
              key={type}
              title={title}
              amount={amount}
              lastTransaction={lastTransaction}
              type={type}
            />
          )}
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
        </>
      }
    </Container>
  )
}
