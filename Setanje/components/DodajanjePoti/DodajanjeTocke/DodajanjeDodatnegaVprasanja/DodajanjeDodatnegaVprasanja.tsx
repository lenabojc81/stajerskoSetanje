import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";
import DodajanjeTeksta from "../../DodajanjeTeksta/DodajanjeTeksta";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import DodajanjeVnosa from "../DodajanjeInformacijTocke/DodajanjeVnosa";
import { Card } from "react-native-paper";

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
            pravilen: i === index-1,
        }));
        setOdgovori(newAnswers);
    };

    const validateFields = () => {
        if (!additionalQuestion.vprasanje.trim()) {
            Alert.alert('Napaka', 'Vprašanje ne sme biti prazno.');
            return false;
        }
        if (!(odgovori.length === numInputFields.length)) {
            Alert.alert('Napaka', 'Odgovori ne smejo biti prazni.');
            return false;
        }
        if (selectedCorrectAnswer === 0) {
            Alert.alert('Napaka', 'Izberi pravilen odgovor.');
            return false;
        }
        return true;
    };

    const saveQuestion = (additionalQuestion: IDodatnoVprasanje) => {
        if (!validateFields()) {
            return;
        }
        additionalQuestion.odgovori = odgovori;
        onAddQuestion(additionalQuestion);
        setAdditionalQuestion({ vprasanje: '', odgovori: [] });
        setOdgovori([]);
        setNumInputFields([0, 1]);
        setSelectedCorrectAnswer(0);
    };

    return (
        <View>
            <Card style={styles.card}>
                <Card.Content>
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
                        <Picker.Item label='Izberi pravilen odgovor' value={0} />
                        {odgovori.map((odgovor, index) => (
                            <Picker.Item key={index} label={odgovor.odgovor} value={index+1} />
                        ))}
                    </Picker>
                </View>
            )}
            {/* <Button title='Shrani dodatno vprašanje' onPress={() => saveQuestion(additionalQuestion)} /> */}
                <TouchableOpacity style={styles.saveButton} onPress={() => saveQuestion(additionalQuestion)}>
                    <Text style={styles.buttonText}>Shrani dodatno vprašanje</Text>
                </TouchableOpacity>
            </Card.Content>
            </Card>
        </View>
    );
};

export default DodajanjeDodatnegaVprasanja;