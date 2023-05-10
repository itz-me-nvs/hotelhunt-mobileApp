import {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from 'styled-components';
import Button from '../../components/UI/Button';
import PageHeader from '../../components/UI/PageHeader';
import Typography from '../../components/UI/Typography';
import {ThemeType} from '../../shared/models/component.type';

import MapView from 'react-native-maps';
import {UserContext} from '../../components/Hooks/UserContext';
import {UserContextType} from '../../shared/models/app.type';
import {UserAccountType, createUser} from '../../shared/services/db';

const UserDetails = () => {
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);

  const {state, dispatch} = useContext<UserContextType | undefined>(
    UserContext,
  ) as UserContextType;

  // user details
  const [userDetails, setUserDetails] = useState<UserAccountType>({
    email: '',
    name: '',
    address: {
      latitude: 0,
      longitude: 0,
    },
    admin: {
      hotels: [],
    },
    cart: [],
    mobileno: '',
    notifications: [],
    uid: '',
  });

  const createNewUser = async () => {
    // firebase FIRESTORE create user
    const user = await createUser(userDetails);
    dispatch({type: 'LOGIN_USER', payload: user!});
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="WELCOME ABOARD"
        subtitle="Complete your profile to join us"
        icon="welcome.png"
        routerPath="Login"
      />

      <View style={styles.userDetailsContainer}>
        <View>
          <View style={styles.userDetailsItem}>
            <Typography color="secondary-50" fontFamily="Medium" fontSize={12}>
              EMAIL ADDRESS
            </Typography>
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={e => setUserDetails({...userDetails, email: e})}
              style={styles.userDetailsItemInput}></TextInput>
          </View>

          <View style={styles.userDetailsItem}>
            <Typography color="secondary-50" fontFamily="Medium" fontSize={12}>
              Name
            </Typography>
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={e => setUserDetails({...userDetails, name: e})}
              style={styles.userDetailsItemInput}></TextInput>
          </View>

          <View style={styles.userDetailsItem}>
            <Typography color="secondary-50" fontFamily="Medium" fontSize={12}>
              Location
            </Typography>

            {/* Google Maps */}

            <View style={styles.googleMapsContainer}>
              <MapView
                style={styles.googleMapView}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onRegionChange={region => {
                  setUserDetails({
                    ...userDetails,
                    address: {
                      latitude: Number(region.latitude.toFixed(4)),
                      longitude: Number(region.longitude.toFixed(4)),
                    },
                  });
                }}
              />
            </View>

            <Typography color="secondary-50" fontFamily="Regular" fontSize={8}>
              By creating an account, I accept the
              <Typography color="primary-75" fontFamily="Medium" fontSize={10}>
                Terms And Conditions
              </Typography>
            </Typography>
          </View>
        </View>
        <Button color="primary" style={{width: '100%'}} onPress={createNewUser}>
          <Typography color="white" fontFamily="SemiBold" fontSize={14}>
            PROCEED
          </Typography>
        </Button>
      </View>
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    userDetailsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 15,
      flex: 1,
    },
    userDetailsItem: {
      marginTop: 20,
    },
    userDetailsItemInput: {
      borderBottomColor: theme['secondary-25'],
      borderBottomWidth: 1,
      width: '100%',
      textAlign: 'left',
      padding: 10,
    },

    googleMapsContainer: {
      height: 150,
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },

    googleMapView: {
      borderRadius: 8,
      flex: 1,
      height: 400,
      width: '100%',
    },
  });

export default UserDetails;
