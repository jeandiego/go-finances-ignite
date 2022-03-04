import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import HistoryCard from "../../components/HistoryCard";
import LoadContainer, { Loader } from "../../components/LoadContainer";
import { TransactionCardProps } from "../../components/TransactionCard";
import { transactionKey } from "../../constants/storage";
import { categories } from "../../utils/categories";
import { currencyFormat } from "../../utils/currencyUtils";
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title
} from "./styles";

interface ICategoryData {
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percent: number;
  percentFormatted: string;
}

export function Resume(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleChangeDate = useCallback((action: "prev" | "next") => {
      if (action === "next") {
        setSelectedDate(addMonths(selectedDate, 1));
      } else {
        setSelectedDate(subMonths(selectedDate, 1));
      }
  }, [selectedDate])

  const loadData = useCallback(async() => {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(transactionKey);
    const transactions = response ? JSON.parse(response) : [];

    const expensives = transactions.filter(
      ({ type, date }: TransactionCardProps) =>
        type === "negative" &&
        new Date(date).getMonth() === selectedDate.getMonth() &&
        new Date(date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, expensive: TransactionCardProps) => {
        return acc + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: ICategoryData[] = [];

    categories.forEach(({ key, name, color }) => {
      let categorySum = 0;
      expensives.forEach(({ category, amount }: TransactionCardProps) => {
        if (category === key) {
          categorySum += Number(amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = currencyFormat(categorySum)
        const percent = (categorySum / expensivesTotal) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          name,
          color,
          total: categorySum,
          totalFormatted,
          percent,
          percentFormatted,
        });
      }
    });
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }, [selectedDate])

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer />
      ) : (
        <Content>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>
            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>
            <MonthSelectButton onPress={() => handleChangeDate("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              colorScale={totalByCategories.map(({ color }) => color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              data={totalByCategories}
              labelRadius={50}
              x="percentFormatted"
              y="total"
            />
          </ChartContainer>
          {React.Children.toArray(totalByCategories.map(({name, totalFormatted, color}) =>
            <HistoryCard
              title={name}
              amount={totalFormatted}
              color={color}
            />
           ))}
        </Content>
      )}
    </Container>
  );
}
