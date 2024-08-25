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
import fetchUserData from "../ProfilUporabnika/FetchUserData"; // Import the fetchUserData function
import { getToken } from "../LogReg/AuthServices"; // Import getToken to check if user is logged in

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // State for admin status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State for login status
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

    // Load the user's admin status and check if logged in
    const loadUserData = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token); // Set isLoggedIn based on token presence

      if (token) {
        await fetchUserData({
          setMessage: setErrorMsg,
          setEmail: () => {},
          setUsername: () => {},
          setIsAdmin: setIsAdmin,
        });
      }
    };

    loadPoti();
    loadUserData();
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
        sortedPoti = sortedPoti.reverse();
        break;
      case "oldest":
        sortedPoti = [...poti];
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
        break;
      default:
        break;
    }

    setPoti(sortedPoti);
  };

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Text style={styles.title}>Seznam poti</Text>

      {errorMsg !== "" && <Text style={styles.error}>{errorMsg}</Text>}

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Sortiraj po:</Text>
        <Picker
          selectedValue={selectedFilter}
          style={styles.picker}
          onValueChange={(itemValue) => handleFilterChange(itemValue)}
        >
          <Picker.Item label="Najnovejše" value="newest" />
          <Picker.Item label="Najstarejše" value="oldest" />
          <Picker.Item label="A-Z" value="alphabetical" />
          <Picker.Item label="Z-A" value="reverseAlphabetical" />
          <Picker.Item label="Težavnost naraščujoča" value="difficulty" />
          <Picker.Item label="Težavnost padajoča" value="reverseDifficulty" />
        </Picker>
      </View>

      {poti.map((pot, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("Pot", { pot, isAdmin })}
        >
          <Card key={index} style={styles.card}>
            <Card.Title title={`Ime poti: ${pot.ime}`} />
            <Card.Content>
              <Text>Opis: {pot.opis}</Text>
              <Text>Težavnost: {pot.tezavnost}</Text>
            </Card.Content>
            <Card.Actions>
              {isLoggedIn && isAdmin && ( // Only show the button if the user is logged in and an admin
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate("UrejanjePoti", { pot })}
                  style={styles.button}
                >
                  Uredi Pot
                </Button>
              )}
            </Card.Actions>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Poti;
