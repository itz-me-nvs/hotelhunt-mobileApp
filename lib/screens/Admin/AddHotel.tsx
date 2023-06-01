import {useEffect, useRef, useState} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import useSnackBar from '../../components/Hooks/useSnackBar';
import Button from '../../components/UI/Button';
import LocationPickerDialog from '../../components/UI/LocationPickingModal';
import PageHeader from '../../components/UI/PageHeader';
import Snackbar from '../../components/UI/SnackBar';
import Typography from '../../components/UI/Typography';
import {HEADER_MAX_HEIGHT} from '../../shared/constants/app.constant';
import {ThemeType} from '../../shared/models/component.type';
import {FoodType, HotelListType, RoomType} from '../../shared/services/db';

const AddHotel = ({navigation, route}: {navigation: any; route: any}) => {
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);

  // snackbar hook
  const {snackbarProps, handleSnackbar} = useSnackBar();

  // location picker dialog state
  const [locationPickerDialog, setLocationPickerDialog] = useState(false);

  const onLocationSelected = (location: {
    latitude: number;
    longitude: number;
  }) => {
    console.log(location, 'uwfbuefbw');

    setAddhotel({
      ...addhotel,
      location,
    });
    setLocationPickerDialog(false);
  };

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

  // route params from Add food/room menu screen
  const params = route.params as {
    menuList: FoodType[] | RoomType[] | undefined;
    type: 'foods' | 'rooms';
  };

  // set menu list from route params
  useEffect(() => {
    console.log('here', params);

    if (params?.menuList) {
      setAddhotel({
        ...addhotel,
        [params.type]: params.menuList,
      });
    }
  }, [params?.menuList]);

  // Add new hotel to database
  const addNewHotel = async () => {
    handleSnackbar({
      duration: 3000,
      message: 'Hotel added successfully',
      SnackBarType: 'success',
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT + 20}}
        scrollEventThrottle={16}
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
              onPress={() => setAddhotel({...addhotel, filter: 'foods'})}
              style={[
                styles.filterItem,
                addhotel.filter === 'foods' ? styles.filterItemActive : {},
              ]}>
              <Typography color="secondary" fontFamily="Medium" fontSize={12}>
                Food Only
              </Typography>
            </Button>

            <Button
              onPress={() => setAddhotel({...addhotel, filter: 'rooms'})}
              style={[
                styles.filterItem,
                addhotel.filter === 'rooms' ? styles.filterItemActive : {},
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: theme['primary-15'],
                borderWidth: 1,
                borderRadius: 7,
              }}>
              <TextInput
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                value={
                  'LAT: ' +
                  addhotel.location.latitude.toString().slice(0, 5) +
                  ', ' +
                  'LONG: ' +
                  addhotel.location.longitude.toString().slice(0, 5)
                }
                onChangeText={e =>
                  setAddhotel({
                    ...addhotel,
                    location: {
                      latitude: e ? parseFloat(e) : 0,
                      longitude: 0,
                    },
                  })
                }
                style={[
                  {
                    flex: 1,
                    width: '100%',
                    textAlign: 'left',
                    padding: 5,

                    fontFamily: 'Medium',
                    fontSize: 14,
                    color: theme['secondary'],
                  },
                ]}></TextInput>

              {/* location icon */}
              <Icon
                name="location"
                size={20}
                color={theme['secondary']}
                style={{marginRight: 10}}
                onPress={() => setLocationPickerDialog(true)}
              />
            </View>
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
            {(addhotel.filter === 'all' || addhotel.filter === 'foods') && (
              <View style={styles.foodRoomContainerItem}>
                <Typography
                  color="secondary"
                  fontFamily="SemiBold"
                  fontSize={12}>
                  Food
                </Typography>

                <ImageBackground
                  source={require('../../assets/icon/addFood.png')}
                  style={styles.menuContainer}>
                  <Button
                    style={styles.menuContainerAddButton}
                    onPress={() =>
                      navigation.navigate('AddMenu', {
                        type: 'foods',
                        menuList: addhotel.foods,
                      })
                    }>
                    {addhotel.foods.length > 0 ? (
                      <Image
                        source={require('../../assets/icon/checkButton.png')}
                        style={styles.menuContainerAddIcon}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/icon/addMenu.png')}
                        style={styles.menuContainerAddIcon}
                      />
                    )}
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
            )}

            {(addhotel.filter === 'all' || addhotel.filter === 'rooms') && (
              <View style={styles.foodRoomContainerItem}>
                <Typography
                  color="secondary"
                  fontFamily="SemiBold"
                  fontSize={12}>
                  Rooms
                </Typography>

                <ImageBackground
                  source={require('../../assets/icon/addRooms.png')}
                  style={styles.menuContainer}>
                  <Button
                    style={styles.menuContainerAddButton}
                    onPress={() =>
                      navigation.navigate('AddRoom', {
                        type: 'rooms',
                        menuList: addhotel.rooms,
                      })
                    }>
                    {addhotel.rooms.length > 0 ? (
                      <Image
                        source={require('../../assets/icon/checkButton.png')}
                        style={styles.menuContainerAddIcon}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/icon/addMenu.png')}
                        style={styles.menuContainerAddIcon}
                      />
                    )}
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
            )}
          </View>

          <Button
            onPress={() => addNewHotel()}
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
      />
      <Snackbar
        visible={snackbarProps.show}
        type={snackbarProps.SnackBarType}
        message={snackbarProps.message}
      />

      <LocationPickerDialog
        isVisible={locationPickerDialog}
        onCancel={() => setLocationPickerDialog(false)}
        onLocationSelected={onLocationSelected}
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
      justifyContent: 'flex-end',
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
