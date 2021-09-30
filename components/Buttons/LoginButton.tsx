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
  buttonStyle?: Record<string, string | number>;
  textStyle?: Record<string, string | number>;
}

/**
 * Simple pre-styled touchable button used in auth and setting screens
 */
const Button = ({
  width = 100,
  height = 58,
  text,
  children,
  onPress,
  buttonStyle,
  textStyle,
}: ButtonProps): JSX.Element => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.buttonStyle, { width, height }, buttonStyle]}>
    {children}
    {text ? <Text style={[styles.textStyle, textStyle]}>{text}</Text> : null}
  </TouchableOpacity>
);

export default Button;
