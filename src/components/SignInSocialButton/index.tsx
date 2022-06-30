import React from "react";
import { View } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Text } from "./styles";

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  icon: React.FC<SvgProps>;
}

export function SignInSocialButton({
  title = 'My Button',
  icon: Icon,
  ...rest
}: SignInSocialButtonProps) {

  return (
    <Button {...rest}>
      <ImageContainer>
        <Icon />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
}
