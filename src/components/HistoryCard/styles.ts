import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface IContainerProps {
  color: string;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  background-color: ${({theme}) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 24px;
  border-radius: 4px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color };
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;
