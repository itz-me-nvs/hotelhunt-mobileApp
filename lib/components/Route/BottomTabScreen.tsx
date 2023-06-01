import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRef} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import AddHotel from '../../screens/Admin/AddHotel';
import AddMenu from '../../screens/Admin/AddMenu';
import AddRoom from '../../screens/Admin/AddRoom';
import LoginPage from '../../screens/Auth/LoginPage';
import OTPVerificationPage from '../../screens/Auth/OTPVerification';
import UserDetails from '../../screens/Auth/UserDetails';
import HomePage from '../../screens/HomePage';
import HotelDetails from '../../screens/User/HotelDetails';
import {ThemeType} from '../../shared/models/component.type';
import Button from '../UI/Button';

function CustomTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const theme = useTheme() as ThemeType;

  console.log(state.index, state.routes);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        // hide bottomtab if route name is admin
        display: state.routes[state.index].name === 'Admin' ? 'none' : 'flex',
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // tab bar icons
        let iconName: string = 'home';
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Settings') {
          iconName = isFocused ? 'settings' : 'settings-outline';
        } else if (route.name === 'Search') {
          iconName = isFocused ? 'search' : 'search-outline';
        } else if (route.name === 'History') {
          // notification icon
          iconName = isFocused ? 'notifications' : 'notifications-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            console.log('her');

            // Define animation for tab change
            Animated.timing(scaleValue, {
              toValue: 1.2,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              navigation.navigate(route.name);
            });
          }
        };

        const scaleValue = useRef(new Animated.Value(1)).current;

        const width = 100;
        const tabBarHeight = 50; // height of the tab bar

        // up curve tab bar
        const startPoint = {
          x: -22,
          y: -40,
        };
        const endPoint = {
          x: 95,
          y: -25,
        };

        const controlPoint1 = {
          x: -8,
          y: 70,
        };
        const controlPoint2 = {
          x: 60,
          y: 70,
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              {
                position: 'relative',
                flex: 1,
                alignItems: 'center',
                padding: 10,
                width: '100%',
                // backgroundColor: 'red',
                backgroundColor: '#F0F8FF',
                borderTopRightRadius: route.name === 'Search' ? 30 : 0,
                borderTopLeftRadius: route.name === 'History' ? 30 : 0,
              },
            ]}>
            {route.name === 'Admin' && (
              // curved tab bar

              <View
                style={{
                  position: 'absolute',
                  // overflow: 'hidden',
                  bottom: 16,
                  left: -1,
                  right: 0,
                  zIndex: 0,
                }}>
                <Svg width={width} height={tabBarHeight}>
                  <Path
                    d={`M ${startPoint.x} ${startPoint.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${endPoint.x} ${endPoint.y}
                    `}
                    fill="#fff"
                  />
                </Svg>

                <View
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    left: 8,
                  }}>
                  <Button
                    onPress={onPress}
                    color="primary"
                    style={{
                      borderRadius: 9999,
                      height: 50,
                      width: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name={'add'} size={30} color={'#fff'}></Icon>
                  </Button>
                </View>
              </View>
            )}
            {route.name != 'Admin' && (
              <Icon
                name={iconName}
                size={20}
                color={
                  isFocused ? theme.primary : 'rgba(70, 95, 124, 0.65)'
                }></Icon>
            )}
            <Text
              style={{
                color: isFocused ? theme.primary : 'rgba(70, 95, 124, 0.65)',
                fontSize: 12,
              }}>
              {route.name === 'Admin' ? '' : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      // change background color of tab bar
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Search"
        component={AuthStackScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Admin"
        component={AdminStackScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="History"
        component={AuthStackScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={AuthStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

/*  Auth Stack Screens */
/*  Home Stack Screens */
/* Search Stack Screens */
/* Profile Stack Screens */
/* History Stack Screens */
/* Admin Stack Screens */

/* Auth Stack Screens */
const AuthStack = createNativeStackNavigator();
export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="UserDetails">
      <AuthStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="OTPVerification"
        component={OTPVerificationPage}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

/* Home Stack Screens */
const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomePage">
      <HomeStack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="HotelDetails"
        component={HotelDetails}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            opacity: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
      },
    };
  },
};

/* Admin Stack Screens */
const AdminStack = createNativeStackNavigator();
export const AdminStackScreen = () => {
  return (
    <AdminStack.Navigator initialRouteName="AddHotel">
      <AdminStack.Screen
        name="AddHotel"
        component={AddHotel}
        options={{
          headerShown: false,
        }}
      />

      <AdminStack.Screen
        name="AddMenu"
        component={AddMenu}
        options={{
          headerShown: false,
        }}
      />

      <AdminStack.Screen
        name="AddRoom"
        component={AddRoom}
        options={{
          headerShown: false,
        }}
      />

      <AdminStack.Screen
        name="HomaPage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
    </AdminStack.Navigator>
  );
};

export default BottomTabScreen;
