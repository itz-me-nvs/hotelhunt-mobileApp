import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import UserProvider from './lib/components/Hooks/UserContext';
import BottomTabScreen, {
  AuthStackScreen,
} from './lib/components/Route/BottomTabScreen';
import {lightTheme} from './lib/shared/constants/theme';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const colorScheme = useColorScheme();

  const isHermes = () => !!HermesInternal;
  console.log(isHermes());

  const isAuthenticated: boolean = true;

  useEffect(() => {
    // Set the initial theme based on the device's color scheme
    setTheme(colorScheme === 'dark' ? lightTheme : lightTheme);
  }, [colorScheme]);

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          {isAuthenticated ? <BottomTabScreen /> : <AuthStackScreen />}
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
