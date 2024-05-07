import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [openFoodData, setOpenFoodData] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${scannedData}.json`)
    .then(response => response.json())
    .then(data => {
      Alert.alert('Product found', JSON.stringify(data));
      setOpenFoodData(data.product.product_name)
    })
    .catch(() => Alert.alert('Error', 'Product not found'));
  }, [scannedData]);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (scannedData ?
      <View style={styles.container}>
        <Text style={styles.text}>{scannedData}</Text>
        <Text style={styles.text}>{openFoodData}</Text>
      </View>
    : (
    <View style={styles.container}>
      <CameraView style={styles.camera}
      onBarcodeScanned={event => setScannedData(event.data)}
      facing={facing}
      >
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
      <Text style={styles.text}>Flip Camera</Text>
      </TouchableOpacity>
      </View>
      </CameraView>
    </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});