import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
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

const initialUser: IUser = {
    __v: 0,
    _id: '',
    email: '',
    password: '',
    username: '',
};

type UporabnikPotiScreenNavigationProp = StackNavigationProp<RootStackParamList, "UporabnikPoti">;

const SeznamOdigranihIger = () => {
    const [listOfGames, setListOfGames] = useState<IUporabnikPot[]>([]);
    const [thisUserData, setThisUserData] = useState<IUser>(initialUser);
    const [message, setMessage] = useState<string>('');
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation = useNavigation<UporabnikPotiScreenNavigationProp>();

    useEffect(() => {
        userData({ setMessage, setData: setThisUserData });
    }, []);

    useEffect(() => {
        // console.log(thisUserData._id);
        if (thisUserData._id != '') {
            pridobiUporabnikoveOpravljenePoti({ idUporabnik: thisUserData._id, setUporabnikovePoti: setListOfGames });
            // fetchData();
        };
    }, [thisUserData]);

    const onRefresh = async () => {
        setRefreshing(true);
        setMessage('');
        if (thisUserData._id != '') {
            pridobiUporabnikoveOpravljenePoti({ idUporabnik: thisUserData._id, setUporabnikovePoti: setListOfGames });
        };
    };

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >
            {listOfGames.map((game, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('Statistika', { game })}>
                    <Card key={index} style={styles.card} >
                    <Card.Title title={game.pot_naziv} />
                    <Card.Content>
                    <Text>{game.idPot}</Text>
                    <Text>{game.celotna_distanca}</Text>
                    <Text>{game.celotni_cas}</Text>
                    <Text>{game.skupne_tocke}</Text>
                    </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

export default SeznamOdigranihIger;
