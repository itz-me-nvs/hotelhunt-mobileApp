import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import Button from '../../components/UI/Button';
import NoDataPage from '../../components/UI/NoDataPage';
import StarRating from '../../components/UI/StarRating';
import Typography from '../../components/UI/Typography';
import {FLEX} from '../../shared/constants/style.constant';
import {ThemeType} from '../../shared/models/component.type';
import {FoodType, HotelListType, RoomType} from '../../shared/services/db';

const HotelDetails = ({route, navigation}: {navigation: any; route: any}) => {
  const hotel = route.params.hotel as HotelListType;

  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);

  // Hotel header animation
  const offset = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: offset}}}],
    {
      useNativeDriver: false,
    },
  );

  const height = offset?.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 60],
    extrapolate: 'clamp',
  });

  // food or room filter

  const [hotelDetails, setHotelDetails] = useState<HotelListType>({
    name: '',
    rating: 0,
    reviews: [],
    rooms: [],
    foods: [],
    id: '',
    description: '',
    img: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
    ownerid: '',
    totalrating: 0,
    filter: 'foods',
  });
  const [filter, setFilter] = useState('foods');

  useEffect(() => {
    if (hotel) {
      hotel.rooms.forEach(room => {
        room['count'] = 1;
      });

      setHotelDetails(hotel);
    }
  }, [hotel]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        contentContainerStyle={{paddingTop: 150}}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hotelDetailsContainer}>
          <View style={styles.hotelCardDetails}>
            <View style={styles.hotelCardDetailsLeft}>
              <Typography color="black" fontFamily="SemiBold" fontSize={16}>
                {hotel?.name}
              </Typography>
              <View
                style={[
                  FLEX.center,
                  {
                    flexDirection: 'row',
                    marginBottom: 5,
                  },
                ]}>
                <StarRating rating={hotel?.rating || 0} size={12} />
                <Typography
                  color="secondary-75"
                  fontFamily="Regular"
                  fontSize={8}
                  style={{marginLeft: 8}}>
                  {`(${hotel?.reviews.length || 0}) reviews`}
                </Typography>
              </View>

              <Typography
                color="secondary-75"
                fontFamily="Regular"
                fontSize={8}>
                Areakode , Malappuram
              </Typography>
            </View>

            <Button
              color="fancyLightBlue-13"
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Typography color="green" fontFamily="Medium" fontSize={10}>
                Open Now
              </Typography>
            </Button>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme['secondary-25'],
              paddingBottom: 10,
            }}>
            <Typography
              style={{marginTop: 10}}
              color="secondary"
              fontFamily="SemiBold"
              fontSize={16}>
              About
            </Typography>

            <Typography color="secondary-75" fontFamily="Regular" fontSize={10}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nunc metus, blandit quis sem at, aliquam imperdiet odio. Integer
              rutrum ex felis, id volutpat mi euismod id. Mauris non ornare
              purus
            </Typography>
          </View>

          <View style={styles.filterContainer}>
            <Button
              onPress={() => setFilter('foods')}
              style={[
                styles.filterItem,
                filter === 'foods' ? styles.filterItemActive : {},
              ]}>
              <Typography color="secondary" fontFamily="Medium" fontSize={12}>
                Food
              </Typography>
            </Button>

            <Button
              onPress={() => setFilter('rooms')}
              style={[
                styles.filterItem,
                filter === 'rooms' ? styles.filterItemActive : {},
              ]}>
              <Typography color="secondary" fontFamily="Medium" fontSize={12}>
                Room
              </Typography>
            </Button>
          </View>
        </View>

        {/* Food or Room List */}

        {(hotelDetails[filter as keyof HotelListType] as [])?.length <= 0 ? (
          <NoDataPage
            title={
              filter === 'foods' ? 'No food available' : 'No rooms available'
            }
          />
        ) : (
          <View style={styles.menuListContainer}>
            {(hotelDetails[filter as keyof HotelListType] as [])?.map(
              (food: FoodType | RoomType, index) => (
                <View
                  key={index}
                  style={[
                    FLEX.between,
                    {
                      flexDirection: 'row',
                      marginBottom: 15,
                      borderBottomWidth:
                        index ===
                        (hotelDetails[filter as keyof HotelListType] as [])
                          .length -
                          1
                          ? 0
                          : 1,
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderBottomColor: theme['secondary-25'],
                    },
                  ]}>
                  <View style={styles.menuItemLeft}>
                    <Typography
                      color={'secondary'}
                      fontFamily="SemiBold"
                      fontSize={12}>
                      {food.name}
                    </Typography>

                    <Typography color="green" fontFamily="Medium" fontSize={12}>
                      {'₹ ' + food.price}
                    </Typography>

                    <Typography
                      style={{marginBottom: 5}}
                      color="secondary-75"
                      fontFamily="Regular"
                      fontSize={10}>
                      {food.desc.length > 50
                        ? food.desc.slice(0, 50) + '...'
                        : food.desc}
                    </Typography>
                  </View>
                  <View style={styles.menuItemRight}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        gap: 10,
                      }}>
                      <Icon
                        name="remove"
                        size={20}
                        color={theme['red']}
                        onPress={() => {
                          let currentCount =
                            (
                              hotelDetails[filter as keyof HotelListType] as
                                | FoodType[]
                                | RoomType[]
                            )[index]['count']! - 1;

                          let filteredCount =
                            currentCount < 1 ? 1 : currentCount;
                          setHotelDetails({
                            ...hotelDetails,
                            [filter as keyof HotelListType]: [
                              ...(
                                hotelDetails[filter as keyof HotelListType] as
                                  | FoodType[]
                                  | RoomType[]
                              ).map((item: FoodType | RoomType, i: number) => {
                                if (i === index) {
                                  return {
                                    ...item,
                                    count: filteredCount,
                                  };
                                } else {
                                  return item;
                                }
                              }),
                            ],
                          });
                        }}
                      />

                      <Typography
                        color="primary"
                        fontFamily="Medium"
                        fontSize={20}>
                        {food.count}
                      </Typography>
                      <Icon
                        name="add"
                        size={20}
                        color={theme['green']}
                        onPress={() => {
                          let currentCount =
                            (
                              hotelDetails[filter as keyof HotelListType] as
                                | FoodType[]
                                | RoomType[]
                            )[index]['count']! + 1;

                          let filteredCount =
                            currentCount > 10 ? 10 : currentCount;

                          setHotelDetails({
                            ...hotelDetails,
                            [filter as keyof HotelListType]: [
                              ...(
                                hotelDetails[filter as keyof HotelListType] as
                                  | FoodType[]
                                  | RoomType[]
                              ).map((item: FoodType | RoomType, i: number) => {
                                if (i === index) {
                                  return {
                                    ...item,
                                    count: filteredCount,
                                  };
                                } else {
                                  return item;
                                }
                              }),
                            ],
                          });
                        }}
                      />
                    </View>

                    <Button
                      color="white"
                      style={{
                        borderWidth: 1,
                        borderColor: theme['primary'],
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        marginBottom: 5,
                      }}>
                      <Typography
                        color="primary"
                        fontFamily="Medium"
                        fontSize={12}>
                        Add
                      </Typography>
                    </Button>
                  </View>
                </View>
              ),
            )}
          </View>
        )}
      </ScrollView>

      <Animated.View
        style={[
          styles.hotelDetailsHeader,
          {
            height: height,
          },
        ]}>
        {/* <Text>Hotel efewf</Text> */}
        <ImageBackground
          source={require('../../assets/icon/mamata.png')}
          style={styles.hotelDetailsImageBackground}>
          <View style={styles.hotelDetailsImageBackgroundBefore}>
            <Button
              onPress={e => navigation.navigate('HomePage')}
              style={[styles.iconContainer]}>
              <Icon name="arrow-back" size={20} color={theme['white']} />
            </Button>

            <Typography
              color="white"
              fontFamily="SemiBold"
              fontSize={16}
              style={{
                opacity: offset?.interpolate({
                  inputRange: [100, 150],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }) as any,
              }}>
              {hotel.name}
            </Typography>

            <View style={styles.iconContainer}>
              <Icon name="cart-outline" size={20} color={theme['white']} />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </SafeAreaView>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    hotelDetailsHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 150,
      width: '100%',
    },
    hotelDetailsImageBackground: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    hotelDetailsImageBackgroundBefore: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexDirection: 'row',
      padding: 15,

      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    iconContainer: {
      backgroundColor: theme['secondary-25'],
      borderRadius: 7,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 5,
    },

    // hotel contents styles

    hotelDetailsContainer: {
      backgroundColor: theme['pageHeader'],
      padding: 15,
    },
    hotelCardDetails: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme['secondary-25'],
    },
    hotelCardDetailsLeft: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },

    // room & food filter styles
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
      paddingVertical: 4,
      paddingHorizontal: 15,
    },
    filterItemActive: {
      backgroundColor: theme['fancyActiveLightBlue-15'],
      borderWidth: 1,
      borderColor: theme['primary-50'],
    },

    menuListContainer: {
      backgroundColor: theme['background'],
    },
    menuItemLeft: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    menuItemRight: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HotelDetails;
