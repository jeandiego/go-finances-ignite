import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 18px;
`;


export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;


export const FormView = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 24px;

`;

export const Fields = styled.View`
`;

export const TransactionView = styled.View`
margin: 16px 0px;
margin-top: 8px;
flex-direction: row;
justify-content: space-between;
`;
