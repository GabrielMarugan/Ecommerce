import { Image, StyleSheet, useColorScheme, View } from 'react-native';
import React from 'react';


const Prevu = ({ source }) => {
    const isDarkMode = useColorScheme() === 'dark';


    if (source === ''){
        return;
    }
    else {
    return (
        <View >
            <Image source={{ uri: source }} style={styles.containerPrevu}></Image>
        </View>
    );
    }
};

const styles = StyleSheet.create({
    containerPrevu: {
        width: 150,
        height: 250,
        borderColor: 'red',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
});

export default Prevu;

