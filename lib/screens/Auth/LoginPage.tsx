import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
  useColorScheme,
} from 'react-native';
import {useTheme} from 'styled-components';
import Button from '../../components/UI/Button';
import Typography from '../../components/UI/Typography';
import {darkTheme} from '../../shared/constants/theme';
import {ThemeType} from '../../shared/models/component.type';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  console.log(darkTheme);

  // const { login } = useAuth();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);

  const handleSendCode = async () => {
    if (phoneNumber.length === 10) {
      try {
        const result = await firebase
          .auth()
          .signInWithPhoneNumber('+91' + phoneNumber);
        console.log(result);

        setVerificationId(result.verificationId!);
        navigation.navigate(
          'OTPVerification' as never,
          {
            verificationId: result.verificationId!,
            phoneNumber: phoneNumber,
          } as never,
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Please enter a valid mobile number');

      // alert("Please enter a valid mobile number");
    }
  };

  const onMobileNumberChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPhoneNumber(e.nativeEvent.text);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center'}}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <Typography color="secondary" fontFamily="SemiBold" fontSize={24}>
          Welcome
        </Typography>
        <Typography color="secondary-50" fontFamily="Medium" fontSize={18}>
          Sign in to continue
        </Typography>

        <Image
          source={require('../../assets/icon/loginImg.png')}
          style={styles.loginImage}
        />

        <Typography
          color="black"
          align="center"
          fontFamily="Medium"
          fontSize={18}>
          OTP Verification
        </Typography>

        <Typography
          color="secondary-75"
          align="center"
          fontFamily="Regular"
          fontSize={11}>
          We will send you an
          <Typography color="secondary" fontFamily="SemiBold" fontSize={11}>
            {' '}
            One Time Password{' '}
          </Typography>
        </Typography>

        <Typography
          color="secondary-75"
          fontFamily="Regular"
          align="center"
          fontSize={11}>
          on this mobile number
        </Typography>

        <View style={styles.mobileInputWrapper}>
          <Typography
            color="secondary-75"
            fontFamily="Medium"
            align="center"
            fontSize={12}>
            Enter Mobile Number
          </Typography>

          <TextInput
            placeholder="+91"
            keyboardType="phone-pad"
            onChange={onMobileNumberChange}
            style={{
              borderBottomColor: 'rgba(70, 95, 124, 0.5)',
              borderBottomWidth: 1,
              width: '70%',
              textAlign: 'center',
            }}>
            <Typography color="black" fontFamily="SemiBold" fontSize={16}>
              {phoneNumber}
            </Typography>
          </TextInput>
        </View>

        <Button color="primary" onPress={handleSendCode}>
          <Typography color="white" fontFamily="SemiBold" fontSize={14}>
            GET OTP
          </Typography>
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.background,
    },
    loginImage: {
      width: '100%',
      height: 150,
      resizeMode: 'contain',
      marginTop: 10,
      marginBottom: 10,
    },

    mobileInputWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      marginBottom: 25,
      display: 'flex',
    },
  });
export default LoginPage;
