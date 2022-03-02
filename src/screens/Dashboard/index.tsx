import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { HighlightCard, IHightlightProps } from "../../components/HighlightCard";
import LoadContainer from "../../components/LoadContainer";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { transactionKey } from "../../constants/storage";
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

interface HightlightProps {
  value: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HightlightProps;
  expensive:HightlightProps;
  total:HightlightProps;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightValues, setHighlightValues] = useState<HighlightData>({} as HighlightData);

  const getLastTransactionDate = useCallback((collection: DataListProps[], type: 'positive' | 'negative') => {
    const lastTransactionDate = new Date(Math.max.apply(Math, collection
      .filter((transaction) => transaction.type === type)
      .map(_transaction => new Date(Date.parse(_transaction.date)).getTime())));

    const day = lastTransactionDate.getDay();
    const month = lastTransactionDate.toLocaleString('pt-BR', { month: 'long'} );

    return `${day} de ${month}`;
    },
  [],
  );

  const hightLightCards: IHightlightProps[] = [
    {
      title: 'Entradas',
      amount: highlightValues?.entries?.value,
      lastTransaction: `Ultima entrada dia ${highlightValues?.entries?.lastTransaction}`,
      type: "up"
    },
    {
      title: "Saídas",
      amount: highlightValues?.expensive?.value,
      lastTransaction: `Ultima entrada ${highlightValues?.expensive?.lastTransaction}`,
      type: "down",
    },
    {
      title: "Total",
      amount: highlightValues?.total?.value,
      lastTransaction: `${highlightValues?.total?.lastTransaction}`,
      type: "total",
    },
  ]

  const loadTransaction = useCallback(async () => {
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

    const lastTransactionEntriesDate = getLastTransactionDate(data, 'positive');
    const lastTransactionExpensiveDate = getLastTransactionDate(data, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensiveDate}`;

    setHighlightValues({
      entries: {
        value: String(currencyFormat(entriesTotal)),
        lastTransaction: lastTransactionEntriesDate
      },
      expensive: {
        value: String(currencyFormat(expensiveTotal)),
        lastTransaction: lastTransactionExpensiveDate
      },
      total: {
        value: String(currencyFormat(entriesTotal - expensiveTotal)),
        lastTransaction: totalInterval
      }
    })

    setLoading(false);
  }, [highlightValues, loading, setHighlightValues, setData, setLoading])


  useFocusEffect(useCallback(() => {
    loadTransaction();
  } , []))

  return (
    <Container>
      {loading ?
        <LoadContainer />
        :
      <>
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
          <LogoutButton>
            <Icon name="power" />
          </LogoutButton>
          </UserWrapper>
        </Header>
        <HighlightCards>
          {React.Children.toArray(hightLightCards.map(
            ({ title, amount, lastTransaction, type }) =>
            <HighlightCard
              title={title}
              amount={amount}
              lastTransaction={lastTransaction}
              type={type}
            />
          ))}
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
