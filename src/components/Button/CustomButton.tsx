import React from 'react';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { tokens } from '../../tokens/js/tokens';

interface CustomButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  onPress,
}) => {
  return (
    <Button
      size={size}
      variant={variant}
      onPress={onPress}
      // You can use your design tokens here
      bg={variant === 'primary' ? tokens.colors?.primary?.value : tokens.colors?.secondary?.value}
    >
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};