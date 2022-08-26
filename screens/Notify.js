import React from 'react';
import notifee from '@notifee/react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../Colors';

const Notify = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Bidon',
      body: 'Un texte pas utile pour une notification',
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onDisplayNotification()}>
        <Text style={styles.buttonTxt}> Notifie-moi !</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 2,
    width: '50%',
    display: 'flex',
    alignSelf: 'center',
  },
  buttonTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
});

export default Notify;
