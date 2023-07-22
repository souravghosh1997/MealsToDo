import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const { user } = useContext(AuthenticationContext);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, data.uri, (error) => {
        if (error) {
          console.log('Error saving photo:', error);
        } else {
          console.log('Photo saved successfully!');
        }
      });
      setImage(data.uri);
      // navigation.goBack();
    }
  };

  const getPermissionAsync = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const toggleCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const ggbk = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    getPermissionAsync();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(camera) => (cameraRef.current = camera)}
        style={styles.camera}
        type={cameraType}
        ratio={'16:9'}></Camera>
      {image && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      )}
      <Button
        title="Take Picture"
        onPress={takePicture}
        style={styles.button}
        titleStyle={styles.buttonTitle}
      />
      <Button title="Switch Camera" onPress={toggleCamera} />
      <Button title="Go Back" onPress={ggbk} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  button: {
    backgroundColor: '#444444',
    borderRadius: 10,
    padding: 10,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
