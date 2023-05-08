import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import {
  PageHeaderComponentType,
  ThemeType,
} from '../../shared/models/component.type';
import Typography from './Typography';

const PageHeader = ({
  title,
  subtitle,
  fancy = false,
  icon,
  children,
  ...rest
}: PageHeaderComponentType) => {
  const imageList = {
    welcome: require(`../../assets/icon/welcome.png`),
    notifications: require('../../assets/icon/notifications.png'),
    addhotel: require('../../assets/icon/addhotel.png'),
  };

  // dynamic import

  const imageSource = imageList[icon as keyof typeof imageList];
  const navigation = useNavigation();
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);
  return (
    <>
      {fancy ? (
        <View style={styles.fancyPageHeaderContainer}>
          <View style={styles.fancyItemContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="location-outline"
                size={25}
                color={theme.secondary}
                onPress={() => navigation.navigate('OTPVerification' as never)}
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

                // text ellipsis
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
        <View style={styles.pageHeaderContainer}>
          <View style={styles.itemContainer}>
            <Icon
              name="arrow-back"
              size={25}
              color={theme.secondary}
              onPress={() => navigation.navigate('OTPVerification' as never)}
            />
            <Typography color="secondary" fontFamily="Bold" fontSize={14}>
              {title}
            </Typography>

            <Typography color="secondary-75" fontFamily="Regular" fontSize={10}>
              {subtitle}
            </Typography>
          </View>

          {/* {iconName != '' && ( */}
          <Image source={imageList[icon as never]} style={styles.headerIcon} />
          {/* )} */}
        </View>
      )}
    </>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    pageHeaderContainer: {
      backgroundColor: theme.pageHeader,
      height: 100,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      padding: 15,
      position: 'relative',
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
      position: 'relative',
    },

    curve: {
      width: '100%',
      height: 100,
      backgroundColor: theme.pageHeader,
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

export default PageHeader;
