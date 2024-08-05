import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";
import DodajanjeTeksta from "../../DodajanjeTeksta/DodajanjeTeksta";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import DodajanjeVnosa from "../DodajanjeInformacijTocke/DodajanjeVnosa";

interface DodajanjeDodatnegaVprasanjaProps {
    onAddQuestion: (value: IDodatnoVprasanje) => void;
}

interface IDodatniOdgovor {
    odgovor: string;
    pravilen: boolean;
}

const DodajanjeDodatnegaVprasanja: React.FC<DodajanjeDodatnegaVprasanjaProps> = ({onAddQuestion}) => {
    const [additionalQuestion, setAdditionalQuestion] = useState<IDodatnoVprasanje>({ vprasanje: '', odgovori: [] });
    const [odgovori, setOdgovori] = useState<IDodatniOdgovor[]>([]);
    const [numInputFields, setNumInputFields] = useState<number[]>([0, 1]);
    const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState<number>(0);

    const addInputField = () => {
        if (numInputFields.length < 4) {
            setNumInputFields([...numInputFields, numInputFields.length]);
        }
    };

    const removeInputField = (index: number) => {
        if (numInputFields.length > 2) {
            setNumInputFields(numInputFields.filter((_, i) => i !== index));
            setOdgovori(odgovori.filter((_, i) => i !== index));
        }
    };

    const handleCorrectAnswerChange = (index: number) => {
        setSelectedCorrectAnswer(index);
        const newAnswers = odgovori.map((odgovor, i) => ({
            ...odgovor,
            pravilen: i === index,
        }));
        setOdgovori(newAnswers);
    };

    const saveQuestion = (additionalQuestion: IDodatnoVprasanje) => {
        additionalQuestion.odgovori = odgovori;
        onAddQuestion(additionalQuestion);
        setAdditionalQuestion({ vprasanje: '', odgovori: [] });
        setOdgovori([]);
        setNumInputFields([0, 1]);
        setSelectedCorrectAnswer(0);
    };

    return (
        <View>
            <Text>DodajanjeDodatnegaVprasanja</Text>
            <DodajanjeVnosa name="Vprašanje" onEnteredValue={(value: string) => setAdditionalQuestion({ ...additionalQuestion, vprasanje: value })} />
            {numInputFields.map((index) => (
                <View key={index} style={styles.inputContainer} >
                    <DodajanjeVnosa name="Odgovor" onEnteredValue={(value: string) => {const newAnswers = [...odgovori]; newAnswers[index] = {odgovor: value, pravilen: false}; setOdgovori(newAnswers)}} />
                    {numInputFields.length > 2 && (
                        <TouchableOpacity onPress={() => removeInputField(index)} style={styles.removeButton} >
                            <Text style={styles.removeButtonText}>-</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            {numInputFields.length < 4 && (
                <TouchableOpacity onPress={addInputField} style={styles.addButton} >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            )}
            {odgovori.length !== 0 && (
                <View>
                    <Text>Nastavi pravilen odgovor</Text>
                    <Picker
                        selectedValue={selectedCorrectAnswer}
                        onValueChange={(itemValue) => handleCorrectAnswerChange(itemValue)}
                    >
                        {odgovori.map((odgovor, index) => (
                            <Picker.Item key={index} label={odgovor.odgovor} value={index} />
                        ))}
                    </Picker>
                </View>
            )}
            <Button title='Shrani dodatno vprašanje' onPress={() => saveQuestion(additionalQuestion)} />
        </View>
    );
};

export default DodajanjeDodatnegaVprasanja;