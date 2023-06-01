import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {
  ButtonComponentType,
  ThemeType,
} from '../../shared/models/component.type';

const Button = ({color, children, ...rest}: ButtonComponentType) => {
  return (
    <StyledButton color={color} {...rest} activeOpacity={0.9}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(TouchableOpacity)`
  background-color: ${({theme, color}: ButtonComponentType) => {
    return theme?.[color as keyof ThemeType];
  }};
  padding-vertical: 8px;
  padding-horizontal: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Button;
