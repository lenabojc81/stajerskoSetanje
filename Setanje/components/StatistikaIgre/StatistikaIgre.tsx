import React from "react";
import { View, Text } from "react-native";
import IUporabnikPot from "../../models/IUporabnikPot";

interface IStatistikaIgreProps {
    uporabnikPot: IUporabnikPot;
};

const StatistikaIgre = () => {
    return (
        <View>
            <Text>Statistika igre</Text>
        </View>
    );
};

export default StatistikaIgre;