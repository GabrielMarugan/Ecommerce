/* eslint-disable prettier/prettier */
import { Alert, Linking, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, useColorScheme, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Colors from '../Colors';


import MapView from './MapView';


const Detail = ({ route}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const utilisateur = route.params;


    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [coord, setCoord] = useState({
                accuracy: 17.70499992370605,
                altitude: 225.59999084472656,
                altitudeAccuracy: 1.1596063375473022,
                heading: 144.20127868652344,
                latitude: 42,
                longitude: 42,
                speed: 0.38775700330734253,
            });

    useEffect(() => {
            setCoord({
                accuracy: 17.70499992370605,
                altitude: 225.59999084472656,
                altitudeAccuracy: 1.1596063375473022,
                heading: 144.20127868652344,
                latitude: parseFloat(utilisateur.address.geo.lat),
                longitude: parseFloat(utilisateur.address.geo.lng),
                speed: 0.38775700330734253,
            });
        },[]);





    return (

        <SafeAreaView
            style={[backgroundStyle, StyleSheet.absoluteFillObject]}>



            <View>
                <Text>
                    Nom :{utilisateur.name}
                    {'\n'}
                    Email: {utilisateur.email}
                </Text>
                <Text>lat: {utilisateur.address.geo.lat}</Text>
                <Text>lng: {utilisateur.address.geo.lng}</Text>
            </View>



            <View style={{ flex: 1 }}>
                <MapView coords={coord} />
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

export default Detail;
