import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper,
} from "./styles";
import { AntDesign } from '@expo/vector-icons';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from "../../hooks/useAuth";

export function SignIn(): JSX.Element {
  const { signInWithGoogle, signInWithApple} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();

    } catch (error) {
      console.warn(error);
      Alert.alert("Não foi possível conectar a conta Google.");
      setIsLoading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.warn(error);
      Alert.alert("Não foi possível conectar a conta Apple.");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"} financas de forma{"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"}uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            icon={() => <AntDesign name="google" size={24} color="black" />}
            enabled={!isLoading}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com Apple"
              icon={() => <AntDesign name="apple1" size={24} color="black" />}
              enabled={!isLoading}
            />
          )}
        </FooterWrapper>
        {isLoading ?
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
            style={{ marginTop: 18 }}
          />
          : null }
      </Footer>
    </Container>
  );
}
