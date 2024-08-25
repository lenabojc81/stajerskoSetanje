import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import IUporabnikPot from "../../models/IUporabnikPot";
import IUser from "../../models/IUser";
import userData from "../ProfilUporabnika/userData";
import { RootStackParamList } from "../Navigacija/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { pridobiUporabnikoveOpravljenePoti } from "../IzvajanjePoti/posiljanjePodatkovUporabnikPot";
import { baseUrl } from "../../global";
import { Card } from "react-native-paper";
import IPot from "../Poti/IPot";
import styles from "./styles";
import { initialUser } from "../../models/initialValues";

type UporabnikPotiScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UporabnikPoti"
>;

const SeznamOdigranihIger = () => {
  const [listOfGames, setListOfGames] = useState<IUporabnikPot[]>([]);
  const [thisUserData, setThisUserData] = useState<IUser>(initialUser);
  const [message, setMessage] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation<UporabnikPotiScreenNavigationProp>();

  useEffect(() => {
    userData({ setMessage, setData: setThisUserData });
  }, []);

  useEffect(() => {
    // console.log(thisUserData._id);
    if (thisUserData._id != "") {
      pridobiUporabnikoveOpravljenePoti({
        idUporabnik: thisUserData._id,
        setUporabnikovePoti: setListOfGames,
      });
      // fetchData();
    }
  }, [thisUserData]);

  const onRefresh = async () => {
    setRefreshing(true);
    setMessage("");
    if (thisUserData._id != "") {
      pridobiUporabnikoveOpravljenePoti({
        idUporabnik: thisUserData._id,
        setUporabnikovePoti: setListOfGames,
      });
    }
    setRefreshing(false);
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Seznam odigranih iger</Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 120}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {listOfGames.map((game, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Statistika", { game })}
          >
            <Card key={index} style={styles.card}>
              <Card.Title title={game.pot_naziv} />
              <Card.Content>
                <Text>prehojena pot: {(Number(game.celotna_distanca.toFixed(0)) / 1000).toFixed(2)} km</Text>
                <Text>porabljen čas: {game.celotni_cas} s</Text>
                <Text>pridobljene točke: {game.skupne_tocke}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SeznamOdigranihIger;
