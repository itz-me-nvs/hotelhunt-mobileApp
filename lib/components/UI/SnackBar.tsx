import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SnackBarComponentType} from '../../shared/models/component.type';

const Snackbar = ({message, type, visible}: SnackBarComponentType) => {
  let backgroundColor, textColor;
  let iconName =
    type === 'success'
      ? 'checkmark-circle'
      : type === 'warning'
      ? 'alert-circle'
      : 'close-circle';

  // colors based on type
  switch (type) {
    case 'success':
      backgroundColor = '#4CAF50'; // green
      textColor = '#FFFFFF'; // white
      break;
    case 'warning':
      backgroundColor = '#FFC107'; // yellow
      textColor = '#000000'; // black
      break;
    case 'danger':
      backgroundColor = '#F44336'; // red
      textColor = '#FFFFFF'; // white
      break;
    default:
      backgroundColor = '#2196F3'; // blue
      textColor = '#FFFFFF'; // white
  }

  return (
    <View
      style={[
        styles.snackbar,
        {
          backgroundColor,
          display: visible ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
      ]}>
      <Icon name={iconName} size={20} color={textColor} />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.message,
          {
            color: textColor,
            marginLeft: 8,
          },
        ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default Snackbar;
