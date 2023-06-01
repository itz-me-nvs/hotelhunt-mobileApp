import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

function LocationPickerDialog({
  isVisible,
  onLocationSelected,
  onCancel,
}: {
  isVisible: boolean;
  onLocationSelected: (selectedLocation: any) => void;
  onCancel: () => void;
}) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  function handleMapPress(event: any) {
    setSelectedLocation(event.nativeEvent.coordinate);
  }

  function handleConfirm() {
    onLocationSelected(selectedLocation);
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm}>
            <Text style={styles.confirmButton}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          onPress={handleMapPress}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  cancelButton: {
    color: 'red',
  },
  confirmButton: {
    color: 'blue',
  },
  map: {
    flex: 1,
  },
});

export default LocationPickerDialog;
