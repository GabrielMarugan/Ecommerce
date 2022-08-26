import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import Header from '../components/Header';
import Colors from '../Colors';
import Notify from './Notify';


const Acceuil = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark'
    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <Header />
                <View
                    style={[
                        {
                            backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        },
                        styles.container,
                    ]}
                >
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Passager')}>
                        <Text style={styles.buttonTxt}>Liste</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('File')}>
                        <Text style={styles.buttonTxt}>Fichier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GeolocationPage')}>
                        <Text style={styles.buttonTxt}>Geolocalisation</Text>
                    </TouchableOpacity>
                    
                </View>
                <Notify style={[
                    {
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    },
                    styles.container,
                ]} />

            </ScrollView >
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
    container: {
        display: 'flex',
        alignItems: 'center',
    }

});

export default Acceuil;