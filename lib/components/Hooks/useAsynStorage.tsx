import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

function useAsyncStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState(initialValue);

  // retrieve the value from storage
  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch (error) {
        console.log('Error loading async storage value', error);
      }
    };

    loadValue();
  }, [key]);

  const saveValue = async (newValue: any) => {
    try {
      setValue(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log('Error saving async storage value', error);
    }
  };

  const clearValue = async () => {
    try {
      setValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error clearing async storage value', error);
    }
  };

  return {value, saveValue, clearValue};
}

export default useAsyncStorage;
