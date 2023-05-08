import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from 'styled-components';
import {
  NoDataComponentType,
  ThemeType,
} from '../../shared/models/component.type';

const NoDataPage = ({icon, subtitle, title}: NoDataComponentType) => {
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);
  return (
    <View style={styles.noDataContainer}>
      <Image
        source={require('../../assets/icon/Nodata.png')}
        style={{
          width: 200,
          height: 200,

          overflow: 'hidden',
          resizeMode: 'contain',
        }}
      />

      {/* <Typography color="secondary" fontFamily="SemiBold" fontSize={16}>
        {title}
      </Typography> */}
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    noDataContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: 15,
    },
  });

export default NoDataPage;
