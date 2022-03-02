import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  justify-content: center;
  border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
  border-color: ${({theme}) => theme.colors.opacity};

  border-radius: 6px;

  ${({isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({theme}) => theme.colors.success_light};
    ` }
  ${({isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({theme}) => theme.colors.attention_light};
    ` }
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({theme, type}) => type === 'up' ?  theme.colors.success : theme.colors.attention};
  margin-right: 12px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

