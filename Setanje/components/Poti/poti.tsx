import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { baseUrl } from "../../global";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import IPot from "../../models/IPot";
import { RootStackParamList } from "../Navigacija/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Button } from 'react-native-paper';

type PotiScreenNavigationProp = StackNavigationProp<RootStackParamList, "Poti">;

export const fetchPoti = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/paths/pridobiPoti`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Napaka pri pridobivanju podatkov");
  }
};

const Poti = () => {
  const [poti, setPoti] = useState<IPot[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("newest");
  const navigation = useNavigation<PotiScreenNavigationProp>();

  useEffect(() => {
    const loadPoti = async () => {
      try {
        const fetchedPoti = await fetchPoti();
        setPoti(fetchedPoti);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    loadPoti();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setErrorMsg("");
    try {
      const fetchedPoti = await fetchPoti();
      setPoti(fetchedPoti);
    } catch (error) {
      setErrorMsg(error.message);
    }
    setRefreshing(false);
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);

    let sortedPoti = [...poti];
    switch (value) {
      case "newest":
        sortedPoti = sortedPoti.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        sortedPoti = sortedPoti.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "alphabetical":
        sortedPoti = sortedPoti.sort((a, b) => a.ime.localeCompare(b.ime));
        break;
      case "reverseAlphabetical":
        sortedPoti = sortedPoti.sort((a, b) => b.ime.localeCompare(a.ime));
        break;
      case "difficulty":
        sortedPoti = sortedPoti.sort((a, b) => a.tezavnost - b.tezavnost);
        break;
      case "reverseDifficulty":
        sortedPoti = sortedPoti.sort((a, b) => b.tezavnost - a.tezavnost);
      default:
        break;
    }

    setPoti(sortedPoti);
  };

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Text style={styles.title}>Poti</Text>

      {errorMsg !== "" && <Text style={styles.error}>{errorMsg}</Text>}

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Sort By:</Text>
        <Picker
          selectedValue={selectedFilter}
          style={styles.picker}
          onValueChange={(itemValue) => handleFilterChange(itemValue)}
        >
          <Picker.Item label="Newest" value="newest" />
          <Picker.Item label="Oldest" value="oldest" />
          <Picker.Item label="Alphabetically" value="alphabetical" />
          <Picker.Item label="Reverse Alphabetically" value="reverseAlphabetical" />
          <Picker.Item label="Difficulty" value="difficulty" />
          <Picker.Item label="Reverse Difficulty" value="reverseDifficulty" />
        </Picker>
      </View>

      {poti.map((pot, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("Pot", { pot })}
        >
          <Card key={index} style={styles.card}>
            <Card.Title title={`Ime poti: ${pot.ime}`} />
            <Card.Content>
              <Text>Opis: {pot.opis}</Text>
              <Text>Težavnost: {pot.tezavnost}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("UrejanjePotiII", { pot })}
                style={styles.button}
              >
                Uredi Pot
              </Button>
            </Card.Actions>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Poti;
