import {useNavigation} from '@react-navigation/native';
import {memo} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
} from '../../shared/constants/app.constant';
import {
  PageHeaderComponentType,
  ThemeType,
} from '../../shared/models/component.type';
import Typography from './Typography';

const PageHeader = ({
  title,
  subtitle,
  fancy = false,
  routerPath = 'HomePage',
  icon,
  animatedValue,
  ScrollBackgroundColor,
  children,
  ...rest
}: PageHeaderComponentType) => {
  // image assests list
  const imageList = {
    welcome: require(`../../assets/icon/welcome.png`),
    notifications: require('../../assets/icon/notifications.png'),
    addhotel: require('../../assets/icon/addhotel.png'),
  };

  // Animated Vector Icon
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  // header height & background animation
  const navigation = useNavigation();
  const theme = useTheme() as ThemeType;

  const height = animatedValue?.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const backgroundColor = animatedValue?.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [theme['pageHeader-50'], theme.white],
    extrapolate: 'clamp',
  });
  const styles = getStyles(theme, backgroundColor);

  return (
    <>
      {fancy ? (
        <View
          style={[
            styles.fancyPageHeaderContainer,
            {
              height: 100,
            },
          ]}>
          <View style={styles.fancyItemContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AnimatedIcon
                name="location-outline"
                size={25}
                color={theme.secondary}
                onPress={() => navigation.navigate(routerPath as never)}
              />
              <Typography
                color="secondary"
                fontFamily="SemiBold"
                fontSize={14}
                style={{marginLeft: 5}}>
                {title}
              </Typography>
            </View>

            <Typography
              color="secondary"
              fontFamily="Regular"
              fontSize={10}
              style={{
                marginTop: 5,
                marginLeft: 5,
                width: '90%',
              }}>
              {subtitle}
            </Typography>
          </View>
          <Image
            source={require('../../assets/icon/notifications.png')}
            style={{
              ...styles.headerIcon,
              marginTop: 10,
            }}
          />
          <View style={styles.curve}></View>
        </View>
      ) : (
        <Animated.View
          style={[
            styles.pageHeaderContainer,
            {
              height: height,
            },
          ]}>
          <Animated.View style={styles.itemContainer}>
            <AnimatedIcon
              name="arrow-back"
              size={25}
              color={theme.secondary}
              onPress={() => navigation.navigate(routerPath as never)}
            />
            <Typography
              color={theme.secondary as keyof ThemeType}
              fontFamily="Bold"
              fontSize={14}>
              {title}
            </Typography>

            <Typography
              color={theme['secondary-75'] as keyof ThemeType}
              fontFamily="Regular"
              fontSize={10}>
              {subtitle}
            </Typography>
          </Animated.View>

          <Image source={imageList[icon as never]} style={styles.headerIcon} />
        </Animated.View>
      )}
    </>
  );
};

const getStyles = (theme: ThemeType, ScrollBackgroundColor: string) =>
  StyleSheet.create({
    pageHeaderContainer: {
      backgroundColor: ScrollBackgroundColor,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      padding: 15,

      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headerIcon: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
      zIndex: 1,
    },

    // Fancy Page Header
    fancyPageHeaderContainer: {
      backgroundColor: theme.background,
      height: 100,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
    },

    curve: {
      width: '100%',
      height: 100,
      backgroundColor: theme['pageHeader-50'],
      position: 'absolute',
      top: 0,
      left: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 50,
      transform: [
        {rotate: '-3deg'},
        {translateY: -20},
        {translateX: -1},
        {scale: 1.1},
      ],
      padding: 15,
    },
    fancyItemContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      zIndex: 1,
      padding: 15,
    },
  });

export default memo(PageHeader);
