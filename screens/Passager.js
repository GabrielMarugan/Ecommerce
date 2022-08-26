import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Colors';

const Passager = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [listeUtilisateur, setListeUtilisateur] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    //pour atteindre le PC hote (si emulateur) ip : 10.0.0.2
    //si le téléphone est en USB : partagé votre connexion de donnée
    // et l'IP sera celle de vote PC (sur le réseau Wifi)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(json => json.json())
      .then(res => setListeUtilisateur(res));
  }, []);

  const styles = StyleSheet.create({
    item: {
      height: 50,
      padding: 10,
      margin: 10,
      elevation: 10,
      shadowColor: '#171717',
      backgroundColor: '#2BB515',
    },
  });

  return (
    <ScrollView style={backgroundStyle}>
      {listeUtilisateur.map(utilisateur => (
        <TouchableOpacity
          key={utilisateur.id}
          style={styles.item}
          onPress={() => navigation.navigate('Detail', utilisateur)}>
          <View>
            <Text>{utilisateur.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
export default Passager;
