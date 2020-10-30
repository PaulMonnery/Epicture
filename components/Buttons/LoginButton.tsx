import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#18b36b',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

interface ButtonProps {
  width?: number | string;
  height?: number | string;
  text?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonStyle?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textStyle?: Record<string, any>;
}

/**
 * Simple pre-styled touchable button used in auth and setting screens
*/
const Button = ({
  width = 100, height = 58, text, children, onPress, buttonStyle, textStyle,
}: ButtonProps): JSX.Element => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.90}
    style={[styles.buttonStyle, { width, height }, buttonStyle]}
  >
    {children}
    {text ? (
      <Text style={[styles.textStyle, textStyle]}>
        {text}
      </Text>
    ) : null}
  </TouchableOpacity>
);

export default Button;
