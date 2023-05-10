/*
Typography component is used to display text in different styles.
It is used in the following way:
import Typography from 'lib/components/UI/Typography';
<Typography variant="heading">Heading</Typography>
<Typography variant="subheading">Subheading</Typography>
*/

import {Animated} from 'react-native';
import styled from 'styled-components';
import {
  ThemeType,
  TypographyComponentType,
} from '../../shared/models/component.type';

const Typography = ({children, ...rest}: TypographyComponentType) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

const StyledText = styled(Animated.Text)`
  font-family: ${({fontFamily}: TypographyComponentType) => {
    return `Poppins-${fontFamily}` || 'Poppins-Regular';
  }};
  font-size: ${({fontSize}: TypographyComponentType) => {
    return fontSize || 16;
  }};
  text-align: ${({align}: TypographyComponentType) => {
    return align || 'left';
  }};

  color: ${({theme, color}: TypographyComponentType) => {
    return theme?.[color as keyof ThemeType];
  }};
`;

export default Typography;
