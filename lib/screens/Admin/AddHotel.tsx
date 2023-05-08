import {StyleSheet, View} from 'react-native';
import {useTheme} from 'styled-components';
import PageHeader from '../../components/UI/PageHeader';
import {ThemeType} from '../../shared/models/component.type';

const AddHotel = () => {
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <PageHeader
        title={'ADD YOUR HOTEL'}
        subtitle={'Fill up with details to post your hotel'}
        icon="addhotel"
      />
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });

export default AddHotel;
