import React from "react";
import { View, Text, Button, Touchable, TouchableOpacity } from "react-native";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";

interface DodatnaVprasanjaProps {
    index: number;
    additionalQuestion: IDodatnoVprasanje;
    onIndexChange: (index: number, correct: boolean) => void;
};

const DodatnaVprasanja: React.FC<DodatnaVprasanjaProps> = ({index, additionalQuestion, onIndexChange}) => {

    const nextAdditionalQuestion = (correct: boolean) => {
        onIndexChange(index + 1, correct);
    };

  return (
    <View>
        <Text>Dodatna vprašanja</Text>
        <Text>{additionalQuestion.vprasanje}</Text>
        {additionalQuestion.odgovori.map((odgovor, index) => (
            <View key={index}>
                <Button title={odgovor.odgovor} onPress={() => nextAdditionalQuestion(odgovor.pravilen)} />
            </View>
        ))}
    </View>
  );
};

export default DodatnaVprasanja;