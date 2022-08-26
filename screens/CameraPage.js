import React, {useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import Colors from '../Colors';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import Prevu from './Prevu';

const CameraPage = ({navigation}) => {
  const devices = useCameraDevices();
  const device = devices.back;

  const camera = useRef(null);

  const [imageUri, setImageUri] = useState('');

  async function onPressButton() {
    const photo = await camera.current.takePhoto();
    setImageUri('file://' + photo.path);
    console.log(photo.path);
  }

  if (device == null) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text> Chargement </Text>
      </ScrollView>
    );
  } else {
    return (
      <>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          photo={true}
          device={device}
          isActive={true}
        />
        <Pressable onPress={onPressButton} style={styles.buttonPhoto}>
          <View style={styles.buttonCircle} />
        </Pressable>
        <View style={styles.preview}>
          <Prevu source={imageUri} />
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 2,
    width: '50%',
  },
  preview: {
    alignSelf: 'center',
    bottom: -250,
  },
  buttonTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
  buttonPhoto: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 5,
  },
  buttonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#eee',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default CameraPage;
