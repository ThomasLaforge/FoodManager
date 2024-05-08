import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { apiPost } from '../tools/fetch';

export default function Page() {
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [openFoodData, setOpenFoodData] = useState<string | null>(null);

  useEffect(() => {
    const getOpenFoodData = async () => {
      try {
        // const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${scannedData}.json`)
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/3310.json`)
        const data = await response.json()
        Alert.alert('Product found', JSON.stringify(data));
        apiPost('/api/products/check-exists', {
            name: data.product.product_name,
            description: data.product.description,
            image: data.product.image_url,
            barcode: scannedData,
        });
        setOpenFoodData(data.product.product_name)
      }
      catch(err){
        Alert.alert('Error', 'Product not found');
      }
    }

    if (scannedData) {
      getOpenFoodData();
    }
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
      <Pressable style={styles.button} onPress={toggleCameraFacing}>
        <Text style={styles.text}>Flip Camera</Text>
      </Pressable>
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