/* eslint-disable prettier/prettier */
import { Alert, Linking, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, useColorScheme, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Colors from '../Colors';
import Geolocation from 'react-native-geolocation-service';

import MapView from './MapView';
import appConfig from '../app.json';

const GeolocationPage = () => {
    const isDarkMode = useColorScheme() === 'dark';


    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };


    const [location, setLocation] = useState(null);


    const watchId = useRef(null);

    useEffect(() => {
        return () => {
            removeLocationUpdates();
        };
    }, [removeLocationUpdates]);

    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        }

        return false;
    };



    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }
        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        Geolocation.getCurrentPosition(
            position => {
                setLocation(position);
                console.log(position);
            },
            error => {
                Alert.alert(`Code ${error.code}`, error.message);
                setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
            },
        );
    };



    const removeLocationUpdates = useCallback(() => {
        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
    }, []);

    return (

        <SafeAreaView
            style={[backgroundStyle, StyleSheet.absoluteFillObject]}>

            <TouchableOpacity
                style={styles.button}
                onPress={getLocation}
            >
                <Text style={styles.buttonTxt}>Localise moi !</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <MapView coords={location?.coords || null} />
            </View>

            <View style={styles.result}>
                <Text>Latitude: {location?.coords?.latitude || ''}</Text>
                <Text>Longitude: {location?.coords?.longitude || ''}</Text>
                <Text>Heading: {location?.coords?.heading}</Text>
                <Text>Accuracy: {location?.coords?.accuracy}</Text>
                <Text>Altitude: {location?.coords?.altitude}</Text>
                <Text>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
                <Text>Speed: {location?.coords?.speed}</Text>
                <Text>Provider: {location?.provider || ''}</Text>
                <Text>
                    Timestamp:{' '}
                    {location?.timestamp
                        ? new Date(location.timestamp).toLocaleString()
                        : ''}
                </Text>
            </View>


        </SafeAreaView>
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
        alignSelf:'center',
    },
    buttonTxt: {
        color: Colors.white,
        textAlign: 'center',
    },
    result: {
        borderWidth: 1,
        borderColor: '#666',
        width: '100%',
        padding: 10,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 12,
        width: '100%',
    },
});

export default GeolocationPage;
