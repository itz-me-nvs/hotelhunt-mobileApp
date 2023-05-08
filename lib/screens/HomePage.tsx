import BuildUrl from 'build-url';
import {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useTheme} from 'styled-components';
import Button from '../components/UI/Button';
import NoDataPage from '../components/UI/NoDataPage';
import PageHeader from '../components/UI/PageHeader';
import StarRating from '../components/UI/StarRating';
import Typography from '../components/UI/Typography';
import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_SEARCH_PLACE_URL,
} from '../shared/constants/app.constant';
import {FLEX} from '../shared/constants/style.constant';
import {ThemeType} from '../shared/models/component.type';
import {HotelFilterType, HotelListType} from '../shared/services/db';

const HomePage = () => {
  const theme = useTheme() as ThemeType;
  const style = getStyles(theme);

  // filter state
  const [filter, setFilter] = useState<HotelFilterType>('all');
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: string;
    longitude: string;
    locationName?: string;
    cityName?: string;
  }>({
    latitude: '',
    longitude: '',
    locationName: 'Areakode',
    cityName: 'Malappuram',
  });
  const changeFilter = (filter: HotelFilterType) => {
    setFilter(filter);
  };

  // hotel list
  const [hotels, Sethotels] = useState<HotelListType[]>([]);

  // useEffect(() => {
  //   // fetch hotels
  //   getHotelList({
  //     lat: Number(11.0444119),
  //     lon: Number(76.0786784),
  //     type: filter,
  //   }).then(res => {
  //     console.log('hotel list', res);
  //     Sethotels(res.filter(item => item.id == 'uJCHCJBT4luIOFzwa7Bz'));
  //   });
  // }, [filter, currentLocation]);

  // get current location
  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  // current location using react-native-geolocation-service and react-native-maps packages

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        };

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        // getting location details using google api
        var key = GOOGLE_MAPS_API_KEY;
        var place = 'place&postal_code&country&street_address';
        var latlong = region.latitude + ',' + region.longitude;

        const locationUrl = BuildUrl(GOOGLE_SEARCH_PLACE_URL, {
          disableCSV: true,
          queryParams: {
            location: latlong,
            radius: (30).toString(),
            type: place,
            key: key,
          },
        });

        // fetching build url based on current location
        const res = await fetch(`${locationUrl}`, {
          method: 'GET',
          headers: {
            'content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        const response = await res.json();
        console.log(response);

        // setting current location
        setCurrentLocation({
          latitude: currentLatitude,
          longitude: currentLongitude,
          locationName: response.results[0].name,
          cityName: response.results[0].vicinity,
        });
      },
      error => console.error(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const width = 100;
  const height = 100;
  const curveHeight = 70; // height of the curved part
  const tabBarHeight = 50; // height of the tab bar

  const startPoint = {x: 0, y: height / 2}; // start point of the curve
  const endPoint = {x: width, y: height / 2}; // end point of the curve
  const controlPoint1 = {x: width / 3, y: 0}; // first control point
  const controlPoint2 = {x: (width * 2) / 3, y: height}; // second control point

  const [state, setState] = useState({
    pathX: '357',
    pathY: '675',
    pathA: '689',
    pathB: '706',
  });

  return (
    <View style={style.homeContainer}>
      <PageHeader
        fancy
        title={currentLocation.locationName ?? 'Areekode'}
        subtitle={
          currentLocation.cityName ??
          'Areekode, Ugrapuram, Kerala, 673315, India'
        }
        icon="notifications.png"
      />

      <View style={style.hotelListContainer}>
        <Typography color="secondary" fontFamily="SemiBold" fontSize={18}>
          What are you looking for
        </Typography>

        <View style={style.hotelFilterType}>
          <Button
            style={{
              ...style.hotelFilterTypeItem,
              borderColor:
                filter === 'all' ? theme['primary-50'] : theme.background,
              borderWidth: 1,
            }}
            onPress={() => changeFilter('all')}>
            <Image
              source={require(`../assets/icon/RoomFood.png`)}
              style={style.hotelFilterTypeIcon}
            />
            <Typography
              numberOfLines={2}
              align="center"
              color="secondary"
              fontFamily="Medium"
              fontSize={10}>
              Rooms & Food
            </Typography>
          </Button>

          <Button
            style={{
              ...style.hotelFilterTypeItem,
              borderColor:
                filter === 'food' ? theme['primary-50'] : theme.background,
              borderWidth: 1,
            }}
            onPress={() => changeFilter('food')}>
            <Image
              source={require(`../assets/icon/foodIcon.png`)}
              style={style.hotelFilterTypeIcon}
            />
            <Typography
              color="secondary"
              fontFamily="Medium"
              fontSize={10}
              align="center">
              Food
            </Typography>
          </Button>

          <Button
            onPress={() => changeFilter('room')}
            style={{
              ...style.hotelFilterTypeItem,
              borderColor:
                filter === 'room' ? theme['primary-50'] : theme.background,
              borderWidth: 1,
            }}>
            <Image
              source={require(`../assets/icon/roomIcon.png`)}
              style={style.hotelFilterTypeIcon}
            />
            <Typography
              color="secondary"
              fontFamily="Medium"
              fontSize={10}
              align="center">
              Rooms
            </Typography>
          </Button>
        </View>

        <View style={style.hotelList}>
          <Typography color="secondary" fontFamily="SemiBold" fontSize={16}>
            Recommended Hotels
          </Typography>

          {hotels.length <= 0 ? (
            <NoDataPage
              title="
            No Hotels Found in this area
            "
            />
          ) : (
            <FlatList
              data={hotels}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <View style={style.hotelCard}>
                    <Button style={style.hotelCardButton}>
                      <Image
                        source={{uri: item.img}}
                        style={style.hotelImage}
                      />
                      <View style={style.hotelCardDetails}>
                        <View style={style.hotelCardDetailsLeft}>
                          <Typography
                            color="black"
                            fontFamily="Medium"
                            fontSize={14}>
                            {item.name}
                          </Typography>
                          <View
                            style={[
                              FLEX.center,
                              {
                                flexDirection: 'row',
                                marginBottom: 5,
                              },
                            ]}>
                            <StarRating rating={item.rating} size={12} />
                            <Typography
                              color="secondary-75"
                              fontFamily="Regular"
                              fontSize={8}
                              style={{marginLeft: 8}}>
                              {`(${item.reviews?.length || 0}) reviews`}
                            </Typography>
                          </View>

                          <Typography
                            color="secondary-75"
                            fontFamily="Regular"
                            fontSize={8}>
                            Areakode , Malappuram
                          </Typography>
                        </View>

                        <Button color="fancyLightBlue-13">
                          <Typography
                            color="green"
                            fontFamily="Medium"
                            fontSize={10}>
                            Open Now
                          </Typography>
                        </Button>
                      </View>
                    </Button>
                  </View>
                );
              }}></FlatList>
          )}
        </View>
      </View>
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    homeContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    hotelListContainer: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 15,
    },
    hotelFilterType: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,

      gap: 10,
    },
    hotelFilterTypeItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,

      width: 80,
      maxHeight: 80,

      backgroundColor: '#F1F5FA',
      padding: 10,
      borderRadius: 9,
    },
    hotelFilterTypeIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      zIndex: 1,
    },

    hotelList: {
      flex: 1,
      backgroundColor: theme.background,
    },
    hotelCard: {
      width: '100%',
      height: 'auto',
      backgroundColor: theme.background,
      borderRadius: 9,
      marginTop: 10,
    },
    hotelCardButton: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    hotelImage: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
      borderRadius: 9,
      // borderTopLeftRadius: 9,
      // borderTopRightRadius: 9,
      // borderBottomRightRadius: 0,
      // borderBottomLeftRadius: 0,
    },
    hotelCardDetails: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexDirection: 'row',
      paddingTop: 10,
      // borderWidth: 1,
      borderRadius: 9,
      // borderColor: theme['primary-50'],
      // borderTopLeftRadius: 0,
      // borderTopRightRadius: 0,
      // borderBottomRightRadius: 9,
      // borderBottomLeftRadius: 9,
    },
    hotelCardDetailsLeft: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  });

export default HomePage;
