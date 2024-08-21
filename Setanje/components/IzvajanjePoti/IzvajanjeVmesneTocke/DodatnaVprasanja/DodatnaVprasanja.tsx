import React, { useEffect, useState } from "react";
import { View, Text, Button, Touchable, TouchableOpacity, Modal } from "react-native";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";

interface DodatnaVprasanjaProps {
    index: number;
    additionalQuestion: IDodatnoVprasanje;
    onIndexChange: (index: number, correct: boolean) => void;
};

interface IDodatniOdgovori  {
    odgovor: string;
    pravilen: boolean;
};

const DodatnaVprasanja: React.FC<DodatnaVprasanjaProps> = ({index, additionalQuestion, onIndexChange}) => {
    const [shuffledAnswers, setShuffledAnswers] = useState<IDodatniOdgovori[]>([...additionalQuestion.odgovori]);

    const nextAdditionalQuestion = (correct: boolean) => {
        onIndexChange(index + 1, correct);
    };

    useEffect(() => {
        setShuffledAnswers(shuffleArray([...additionalQuestion.odgovori]));
    }, [additionalQuestion]);
    
    const shuffleArray = (array: IDodatniOdgovori[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

  return (
    <Modal animationType="slide" visible={true}>
    <View>
        <Text>Dodatna vprašanja</Text>
        <Text>{additionalQuestion.vprasanje}</Text>
        {shuffledAnswers.map((odgovor, index) => (
            <View key={index}>
                <Button title={odgovor.odgovor} onPress={() => nextAdditionalQuestion(odgovor.pravilen)} />
            </View>
        ))}
    </View>
    </Modal>
  );
};

export default DodatnaVprasanja;