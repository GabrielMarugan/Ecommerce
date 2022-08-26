import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Colors from '../Colors';
import DocumentPicker from 'react-native-document-picker';
import {Camera} from 'react-native-vision-camera';

const File = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [fileResponse, setFileResponse] = useState([]);
  const [multipleFile, setMultipleFile] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  async function onPressButtonAuthorisation() {
    await Linking.openSettings();
    setModalVisible(false);
  }

  async function onPressButtonPhoto() {
    let permission = await Camera.getCameraPermissionStatus();

    if (permission === 'authorized') {
      navigation.navigate('CameraPage');
    } else {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission === 'denied') {
        setModalVisible(true);
      }
    }
  }

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullscreen',
      });
      setFileResponse(response);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Erreur');
      } else {
        alert('Erreur Inconnu: ' + JSON.stringify(err));
        throw err;
      }
      console.warn(err);
    }
  }, []);

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Selection annulé');
      } else {
        alert('Erreur inconnu: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={handleDocumentSelection}>
        <Text style={styles.buttonTxt}> Selection 1 fichier </Text>
      </TouchableOpacity>
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.container}
          ellipsizeMode={'middle'}>
          File Name: {file.name ? file.name : ''}
          {'\n'}
          URI: {file.uri ? file.uri : ''}
        </Text>
      ))}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={selectMultipleFile}>
        <Text style={styles.buttonTxt}> Multi Selection</Text>
      </TouchableOpacity>
      {multipleFile.map((item, key) => (
        <View key={key}>
          <Text style={styles.container}>
            File Name: {item.name ? item.name : ''}
            {'\n'}
            URI: {item.uri ? item.uri : ''}
          </Text>
        </View>
      ))}

      <Modal visible={modalVisible} transparent={false} animationType={'slide'}>
        <Text>
          Pour utiliser cette fonctionnalité vous devez accepter les
          authorisations
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressButtonAuthorisation}>
          <Text style={styles.buttonTxt}> changer les authorisations</Text>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={onPressButtonPhoto}>
        <Text style={styles.buttonTxt}>Prendre une photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 2,
    width: '50%',
    alignSelf: 'center',
  },
  buttonTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
});

export default File;
