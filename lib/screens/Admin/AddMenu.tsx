import {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useTheme} from 'styled-components';
import Button from '../../components/UI/Button';
import PageHeader from '../../components/UI/PageHeader';
import Typography from '../../components/UI/Typography';
import {HEADER_MAX_HEIGHT} from '../../shared/constants/app.constant';
import {ThemeType} from '../../shared/models/component.type';
import {FoodType} from '../../shared/services/db';

const AddMenu = ({navigation, route}: {navigation: any; route: any}) => {
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);
  // const navigation = useNavigation();
  // const route = useRoute();
  const params = route.params as {
    menuList: FoodType[] | undefined;
    type: 'foods' | 'rooms';
  };

  const [menuList, setMenuList] = useState<FoodType[]>(() => {
    return params.menuList || [];
  });

  const [snackbar, setSnackbar] = useState({
    show: false,
    msg: '',
    type: 'success',
  });

  const [currentItem, setCurrentItem] = useState<FoodType>({
    name: '',
    price: '',
    tid: 0,
    id: '',
    desc: '',
    count: 0,
  });

  const offset = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: offset}}}],
    {
      useNativeDriver: false,
    },
  );

  const transitionValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(transitionValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  // Add menu item
  const addMenuItem = () => {
    if (currentItem.name === '') {
      setSnackbar({
        show: true,
        msg: 'Please enter food name',
        type: 'error',
      });
      return;
    } else if (currentItem.price === '') {
      setSnackbar({
        show: true,
        msg: 'Please enter food price',
        type: 'error',
      });
      return;
    } else if (currentItem.desc === '') {
      setSnackbar({
        show: true,
        msg: 'Please enter food description',
        type: 'error',
      });
      return;
    }

    setMenuList([
      ...menuList,
      {
        ...currentItem,
        id: menuList.length.toString() + 1,
      },
    ]);

    // Reset current item
    setCurrentItem({
      name: '',
      price: '',
      tid: 0,
      id: '',
      desc: '',
      count: 0,
    });
  };

  // remove menu item
  const removeMenuItem = (id: string) => {
    const newMenuList = menuList.filter(item => item.id !== id);
    setMenuList(newMenuList);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        transform: [
          {
            translateY: transitionValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-30, 0],
            }),
          } as any,
        ],
      }}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {menuList.map((item, index) => (
          <View key={index} style={styles.itemListContainer}>
            <View>
              <Typography color="secondary" fontFamily="SemiBold" fontSize={12}>
                {item.name}
              </Typography>

              <Typography color="green" fontFamily="Medium" fontSize={12}>
                {'₹ ' + item.price}
              </Typography>

              <Typography
                color="secondary-75"
                fontFamily="Regular"
                fontSize={10}>
                {item.desc}
              </Typography>
            </View>
            <Button
              onPress={() => removeMenuItem(item.id!)}
              style={{
                borderWidth: 1,
                borderColor: theme['red'],
              }}>
              <Typography color="red" fontFamily="Medium" fontSize={12}>
                REMOVE
              </Typography>
            </Button>
          </View>
        ))}
        <View style={styles.itemAddContainer}>
          <TextInput
            keyboardType="default"
            autoCapitalize="none"
            placeholder="item name"
            placeholderTextColor={theme['secondary']}
            style={styles.userDetailsItemInput}
            onChangeText={text => setCurrentItem({...currentItem, name: text})}
            value={currentItem.name}
          />

          <TextInput
            keyboardType="default"
            autoCapitalize="none"
            placeholder="item description"
            placeholderTextColor={theme['secondary-75']}
            style={[
              styles.userDetailsItemInput,
              {
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
              },
            ]}
            onChangeText={text => setCurrentItem({...currentItem, desc: text})}
            value={currentItem.desc}
          />

          <View
            style={[
              {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              keyboardType="number-pad"
              autoCapitalize="none"
              onChangeText={text =>
                setCurrentItem({...currentItem, price: text})
              }
              placeholder="₹ "
              placeholderTextColor={theme['green']}
              style={[
                styles.userDetailsItemInput,
                {
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                  width: 50,
                },
              ]}
              value={currentItem.price}
            />

            <Button
              onPress={() => addMenuItem()}
              color="fancyLightBlue-13"
              style={{
                display: 'flex',
                alignSelf: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}>
              <Typography color="green" fontFamily="SemiBold" fontSize={12}>
                Add item
              </Typography>
            </Button>
          </View>
        </View>
      </ScrollView>

      <PageHeader
        title={'ADD YOUR FOOD MENU'}
        subtitle={'Add your items to update the menu'}
        icon="addhotel"
        routerPath="HomePage"
        animatedValue={offset}
      />

      <View style={styles.stickyContainer}>
        <Button
          // params with merge true will merge params with previous screen
          onPress={() =>
            navigation.navigate('AddHotel', {
              merge: true,
              menuList: menuList,
              type: 'food',
            })
          }
          color="primary"
          style={{width: '90%', display: 'flex', alignSelf: 'center'}}>
          <Typography color="white" fontFamily="SemiBold" fontSize={14}>
            SAVE
          </Typography>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    itemAddContainer: {
      padding: 15,
      flex: 1,
      position: 'relative',
    },

    userDetailsItemInput: {
      borderBottomColor: theme['secondary-25'],
      borderBottomWidth: 1,

      width: '100%',
      textAlign: 'left',

      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      paddingVertical: 5,
      paddingHorizontal: 0,
    },

    itemListContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    stickyContainer: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#CCCCCC',
      padding: 20,

      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

export default AddMenu;
