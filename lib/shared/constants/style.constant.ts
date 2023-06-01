import {StyleSheet} from 'react-native';

// flex styles constants

export const FLEX = StyleSheet.create({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
  },
  end: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    display: 'flex',
  },
  between: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
  },
});
