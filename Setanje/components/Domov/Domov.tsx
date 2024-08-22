import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import { RootStackParamList } from '../Navigacija/types';
import * as React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Appbar, Card } from 'react-native-paper';
import fetchUserData from '../ProfilUporabnika/FetchUserData';
import { fetchPoti } from '../Poti/poti';
import IPot from '../../models/IPot';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const natureIcons = [
  'https://image.flaticon.com/icons/png/512/616/616438.png', // Mountain
  'https://image.flaticon.com/icons/png/512/616/616451.png', // Tree
  'https://image.flaticon.com/icons/png/512/616/616407.png', // Waterfall
  'https://image.flaticon.com/icons/png/512/616/616401.png', // River
  'https://image.flaticon.com/icons/png/512/616/616418.png', // Forest
  'https://image.flaticon.com/icons/png/512/616/616408.png', // Leaf
  'https://image.flaticon.com/icons/png/512/616/616430.png', // Sun
];

const Domov = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [username, setUsername] = React.useState<string | null>(null);
  const [poti, setPoti] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadUserData = async () => {
      await fetchUserData({ setMessage, setUsername, setEmail });
    };

    const loadPaths = async () => {
      try {
        const fetchedPaths = await fetchPoti();
        setPoti(fetchedPaths);
      } catch (error: any) {
        setMessage(error.message || 'Failed to load paths');
      }
    };

    loadUserData();
    loadPaths();
  }, []);

  const getRandomPaths = () => {
    if (poti.length > 0) {
      const shuffledPaths = [...poti].sort(() => 0.5 - Math.random());
      return shuffledPaths.slice(0, 3);
    }
    return [];
  };

  const getRandomNatureIcon = () => {
    return natureIcons[Math.floor(Math.random() * natureIcons.length)];
  };

  const handleCardPress = (path: IPot) => {
    navigation.navigate("Pot", { pot: path });
  };

  const randomFeaturedPaths = getRandomPaths();
  const randomTryThisPaths = getRandomPaths();
  const newestPaths = poti.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Zdravo ${username || 'User'}`}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priljubljene poti</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {randomFeaturedPaths.length > 0 ? (
              randomFeaturedPaths.map((path, index) => (
                <TouchableOpacity key={index} onPress={() => handleCardPress(path)}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Image
                        source={{ uri: getRandomNatureIcon() }}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardTitle}>{path.ime}</Text>
                      <Text style={styles.cardDifficulty}>{'★'.repeat(path.tezavnost)}</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No paths available</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Najnovejše poti</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {newestPaths.map((path, index) => (
              <TouchableOpacity key={index} onPress={() => handleCardPress(path)}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Image
                      source={{ uri: getRandomNatureIcon() }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>{path.ime}</Text>
                    <Text style={styles.cardDifficulty}>{'★'.repeat(path.tezavnost)}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Poskusi tole</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {randomTryThisPaths.length > 0 ? (
              randomTryThisPaths.map((path, index) => (
                <TouchableOpacity key={index} onPress={() => handleCardPress(path)}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Image
                        source={{ uri: getRandomNatureIcon() }}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardTitle}>{path.ime}</Text>
                      <Text style={styles.cardDifficulty}>{'★'.repeat(path.tezavnost)}</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))
            ) : (
              <Text>Poti niso na voljo</Text>
            )}
          </ScrollView>
        </View>
      </View>

      {message && (
        <View>
          <Text>{message}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Domov;
