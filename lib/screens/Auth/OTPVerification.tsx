import {firebase} from '@react-native-firebase/auth';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {
  Image,
  View as KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'styled-components';
import Button from '../../components/UI/Button';
import Typography from '../../components/UI/Typography';
import {darkTheme} from '../../shared/constants/theme';
import {ThemeType} from '../../shared/models/component.type';

// import Button from '../../components/UI/Button';

const OTPVerificationPage = () => {
  console.log(darkTheme);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput> | null>([]); // create an array of refs

  const [verificationId, setVerificationId] = useState('');
  const [timer, setTimer] = useState(0); // countdown timer in seconds
  const [timerIntervalId, setTimerIntervalId] = useState<number | null>(null); // ID of the interval timer

  // get route params
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as any;
  console.log(params);

  // const { login } = useAuth();
  const colorScheme = useColorScheme();
  const theme = useTheme() as ThemeType;
  const styles = getStyles(theme);

  const verifyOTP = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        params.verificationId,
        otp.join(''),
      );

      // confirm the verification code
      await firebase.auth().signInWithCredential(credential);

      // context.login();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }

    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    // move to next input
    if (index < 5 && value) {
      inputs.current![index + 1].focus();
    }

    // back to previous input
    if (index > 0 && !value) {
      inputs.current![index - 1].focus();
    }

    console.log(
      otpCopy,
      inputs.current?.map(input => input),
    );
  };

  // Resend OTP
  const handleResendCode = async () => {
    try {
      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(params.phoneNumber);

      setVerificationId(confirmation.verificationId!);
    } catch (error) {
      // alert(error.message);
    }

    // start countdown timer
    setTimer(60);
    startTimer();
  };

  // Countdown timer
  const startTimer = () => {
    const internalID = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        clearInterval(internalID);
        setTimerIntervalId(null);
      }
    }, 1000);

    setTimerIntervalId(internalID);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <Icon
          name="arrow-back"
          size={25}
          color={theme.secondary}
          onPress={() => navigation.goBack()}
        />

        <Typography
          color="secondary"
          align="center"
          fontFamily="Medium"
          fontSize={12}
          style={{marginLeft: 10}}>
          back
        </Typography>
      </View>
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
        Enter the OTP send to
        <Typography color="secondary" fontFamily="SemiBold" fontSize={11}>
          {' '}
          +91 {params.phoneNumber}{' '}
        </Typography>
      </Typography>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
            maxLength={1}
            onChangeText={text => handleOtpChange(index, text)}
            ref={ref => (inputs.current![index] = ref!)}
            value={value}
            keyboardType="numeric"
          />
        ))}
      </View>

      <Typography
        color="secondary-75"
        align="center"
        fontFamily="Regular"
        fontSize={11}
        style={{marginTop: 20}}>
        Didn't receive the OTP?
      </Typography>
      <Typography
        color="error"
        fontFamily="SemiBold"
        fontSize={11}
        align="center"
        onPress={handleResendCode}>
        {' '}
        {timer > 0 ? `Resend OTP in ${timer} seconds` : 'Resend OTP'}
      </Typography>

      <Button color="primary" onPress={verifyOTP}>
        <Typography color="white" fontFamily="SemiBold" fontSize={14}>
          VERIFY
        </Typography>
      </Button>
    </KeyboardAvoidingView>
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

    otpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      margin: 'auto',
      marginVertical: 20,
    },
    input: {
      width: 40,
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: theme['secondary-50'],
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 5,
    },
  });
export default OTPVerificationPage;
