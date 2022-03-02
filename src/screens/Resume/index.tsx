import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { transactionKey } from '../../constants/storage';
import { categories } from '../../utils/categories';
import { currencyFormat } from '../../utils/currencyUtils';
import { Container, Header, Title, Content } from './styles';

interface ICategoryData {
  name: string;
  total: string;
  color: string;
}

export function Resumo() {
  const [totalByCategories, setTotalByCategories ] = useState<ICategoryData[]>([]);


  const loadTransaction = useCallback(async () => {
    const response = await AsyncStorage.getItem(transactionKey);
    const transactions = response ? JSON.parse(response) : [];

    const expensives = transactions.filter((expensive: TransactionCardProps) => expensive.type === 'negative')

    const totalByCategory: ICategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if (expensive.category === category.key)
        categorySum += Number(expensive.amount)
      })

      if(categorySum > 0) {
        const total = currencyFormat(categorySum);

        totalByCategory.push({
          name: category.name,
          color: category.color,
          total
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }, [])


  useEffect(() => {
    loadTransaction()
  }, [])

  return (
      <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>

        <Content>
          {React.Children.toArray(totalByCategories.map(({name, total, color}) =>
            <HistoryCard
              title={name}
              amount={total}
              color={color}
            />
          ))}
        </Content>
      </Container>
    );
}

