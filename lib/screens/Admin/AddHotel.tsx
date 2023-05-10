import {useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useTheme} from 'styled-components';
import Button from '../../components/UI/Button';
import PageHeader from '../../components/UI/PageHeader';
import Typography from '../../components/UI/Typography';
import {HEADER_MAX_HEIGHT} from '../../shared/constants/app.constant';
import {ThemeType} from '../../shared/models/component.type';
import {HotelListType} from '../../shared/services/db';

const AddHotel = () => {
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);

  const [headerStyle, setHeaderStyle] = useState(theme['pageHeader']);

  // Add hotel details with food & room items
  const [addhotel, setAddhotel] = useState<HotelListType>({
    description: '',
    foods: [],
    id: '',
    img: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
    name: '',
    rating: 0,
    rooms: [],
    ownerid: '',
    reviews: [],
    totalrating: 0,

    filter: 'all',
  });

  const offset = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: offset}}}],
    {
      useNativeDriver: false,
    },
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hotelDetailsInputContainer}>
          <Typography color="secondary" fontFamily="SemiBold" fontSize={12}>
            TYPE
          </Typography>
          <View style={styles.filterContainer}>
            <Button
              onPress={() => setAddhotel({...addhotel, filter: 'all'})}
              style={[
                styles.filterItem,
                addhotel.filter === 'all' ? styles.filterItemActive : {},
              ]}>
              <Typography color="secondary" fontFamily="Medium" fontSize={12}>
                Food & Rooms
              </Typography>
            </Button>

            <Button
              onPress={() => setAddhotel({...addhotel, filter: 'food'})}
              style={[
                styles.filterItem,
                addhotel.filter === 'food' ? styles.filterItemActive : {},
              ]}>
              <Typography color="secondary" fontFamily="Medium" fontSize={12}>
                Food Only
              </Typography>
            </Button>

            <Button
              onPress={() => setAddhotel({...addhotel, filter: 'room'})}
              style={[
                styles.filterItem,
                addhotel.filter === 'room' ? styles.filterItemActive : {},
              ]}>
              <Typography color="secondary" fontFamily="Medium" fontSize={12}>
                Room Only
              </Typography>
            </Button>
          </View>

          <View style={styles.hotelDetailsItem}>
            <Typography color="secondary-50" fontFamily="Medium" fontSize={12}>
              HOTEL NAME
            </Typography>
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={e => setAddhotel({...addhotel, name: e})}
              style={styles.hotelDetailsItemInput}></TextInput>
          </View>

          <View style={styles.hotelDetailsItem}>
            <Typography color="secondary-50" fontFamily="Medium" fontSize={12}>
              LOCATION
            </Typography>
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={e =>
                setAddhotel({
                  ...addhotel,
                  location: {
                    latitude: 0,
                    longitude: 0,
                  },
                })
              }
              style={styles.hotelDetailsItemInput}></TextInput>
          </View>

          <View style={styles.hotelDetailsItem}>
            <Typography color="secondary-50" fontFamily="Medium" fontSize={12}>
              ABOUT HOTEL
            </Typography>
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={e =>
                setAddhotel({
                  ...addhotel,
                  description: e,
                })
              }
              style={styles.hotelDetailsItemInput}></TextInput>
          </View>

          <View style={styles.foodRoomContainer}>
            <View style={styles.foodRoomContainerItem}>
              <Typography color="secondary" fontFamily="SemiBold" fontSize={12}>
                Food
              </Typography>

              <ImageBackground
                source={require('../../assets/icon/addFood.png')}
                style={styles.menuContainer}>
                <Button style={styles.menuContainerAddButton}>
                  <Image
                    source={require('../../assets/icon/addMenu.png')}
                    style={styles.menuContainerAddIcon}
                  />
                </Button>
                <Typography
                  color="white"
                  fontFamily="SemiBold"
                  fontSize={12}
                  style={styles.menuContainerAddText}>
                  Add Menu
                </Typography>
              </ImageBackground>
            </View>

            <View style={styles.foodRoomContainerItem}>
              <Typography color="secondary" fontFamily="SemiBold" fontSize={12}>
                Rooms
              </Typography>

              <ImageBackground
                source={require('../../assets/icon/addRooms.png')}
                style={styles.menuContainer}>
                <Button style={styles.menuContainerAddButton}>
                  <Image
                    source={require('../../assets/icon/addMenu.png')}
                    style={styles.menuContainerAddIcon}
                  />
                </Button>
                <Typography
                  color="white"
                  fontFamily="SemiBold"
                  fontSize={12}
                  style={styles.menuContainerAddText}>
                  Add Rooms
                </Typography>
              </ImageBackground>
            </View>
          </View>

          <Button
            color="primary"
            style={{
              marginTop: 80,
            }}>
            <Typography color="white" fontFamily="SemiBold" fontSize={14}>
              PROCEED
            </Typography>
          </Button>
        </View>
      </ScrollView>

      <PageHeader
        title={'ADD YOUR HOTEL'}
        subtitle={'Fill up with details to post your hotel'}
        icon="addhotel"
        routerPath="HomePage"
        animatedValue={offset}
        ScrollBackgroundColor={headerStyle as keyof ThemeType}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    hotelDetailsInputContainer: {
      padding: 15,
      flex: 1,
    },
    filterContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    filterItem: {
      backgroundColor: theme['background'],
      borderWidth: 1,
      borderColor: theme['secondary-50'],
      borderRadius: 7,
      padding: 8,
    },
    filterItemActive: {
      backgroundColor: theme['fancyActiveLightBlue-15'],
      borderWidth: 1,
      borderColor: theme['primary-50'],
    },
    hotelDetailsItem: {
      marginTop: 15,
    },
    hotelDetailsItemInput: {
      borderColor: theme['primary-15'],
      borderWidth: 1,
      borderRadius: 7,
      width: '100%',
      textAlign: 'left',
      padding: 5,

      fontFamily: 'Medium',
      fontSize: 14,
      color: theme['secondary'],
      marginVertical: 4,
    },
    foodRoomContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },

    foodRoomContainerItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
    },
    menuContainer: {
      marginTop: 7,
      height: 100,
      aspectRatio: 1,
      resizeMode: 'cover',

      position: 'relative',
      overflow: 'hidden',
      borderRadius: 18,
    },
    menuContainerAddButton: {
      position: 'absolute',
      left: 25,
      top: '28%',
    },
    menuContainerAddIcon: {
      position: 'absolute',
      height: 40,
      width: 40,
    },
    menuContainerAddText: {
      position: 'absolute',
      left: 35,
      bottom: '0%',
      transform: [{translateX: -25}, {translateY: -15}],
    },
  });

export default AddHotel;
