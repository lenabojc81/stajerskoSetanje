import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";
import UrejanjeTeksta from "../../UrejanjeTeksta/UrejanjeTeksta";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import UrejanjeVnosa from "../UrejanjeInformacijTocke/UrejanjeVnosa";
import IVmesnaTocka from "../../../../models/IVmesnaTocka";

interface UrejanjeDodatnegaVprasanjaProps {
    onAddQuestion: (value: IDodatnoVprasanje) => void;
    questionToEdit?: IDodatnoVprasanje| null;  
    onEditComplete?: (updatedQuestion: IDodatnoVprasanje) => void; 
}

interface IDodatniOdgovor {
    odgovor: string;
    pravilen: boolean;
}

const UrejanjeDodatnegaVprasanja: React.FC<UrejanjeDodatnegaVprasanjaProps> = ({onAddQuestion, questionToEdit, onEditComplete}) => {
    const [additionalQuestion, setAdditionalQuestion] = useState<IDodatnoVprasanje>(questionToEdit || { vprasanje: '', odgovori: [] });
    const [odgovori, setOdgovori] = useState<IDodatniOdgovor[]>(questionToEdit ? questionToEdit.odgovori : []);
    const [numInputFields, setNumInputFields] = useState<number[]>(questionToEdit ? Array(questionToEdit.odgovori.length).fill(0) : [0, 1]);
    const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState<number>(questionToEdit ? questionToEdit.odgovori.findIndex(o => o.pravilen) : 0);

 

    console.log("TO BI NAJ BIL ADDITIONALQUESTINS ", additionalQuestion);
    console.log("TO BI NAJ BIL ODGOVORI ", odgovori);
    console.log("TO BI NAJ BIL NUMINPUTFIELDS ", numInputFields);
    console.log("TO BI NAJ BIL SELECTEDCORRECTANSWER ", selectedCorrectAnswer);

  



    const addInputField = () => {
        if (numInputFields.length < 4) {
            setNumInputFields([...numInputFields, numInputFields.length]);
            setOdgovori([...odgovori, { odgovor: '', pravilen: false }]);
        }
    };

    const removeInputField = (index: number) => {
        if (numInputFields.length > 2) {
            setNumInputFields(numInputFields.filter((_, i) => i !== index));
            const updatedOdgovori = odgovori.filter((_, i) => i !== index);
            setOdgovori(updatedOdgovori);
            if (selectedCorrectAnswer === index) {
                setSelectedCorrectAnswer(-1); 
            }
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

    const validateFields = () => {
        if (!additionalQuestion.vprasanje.trim()) {
            Alert.alert('Napaka', 'Vprašanje ne sme biti prazno.');
            return false;
        }
        if (!(odgovori.length === numInputFields.length)) {
            Alert.alert('Napaka', 'Odgovori ne smejo biti prazni.');
            return false;
        }
        return true;
    };

    const saveQuestion = () => {
        if (!validateFields()) return;

        const updatedQuestion = {
            ...additionalQuestion,
            odgovori,
        };

        if (questionToEdit) {
            onEditComplete?.(updatedQuestion);
        } else {
            onAddQuestion(updatedQuestion);
        }

        setAdditionalQuestion({ vprasanje: '', odgovori: [] });
        setOdgovori([]);
        setNumInputFields([0, 1]);
       // setSelectedCorrectAnswer(-1);
    };


    return (
        <View>
            <Text>DodajanjeDodatnegaVprasanja</Text>

            <UrejanjeVnosa name="Vprašanje" value={additionalQuestion.vprasanje} onEnteredValue={(value: string) => setAdditionalQuestion({ ...additionalQuestion, vprasanje: value })} />
            {numInputFields.map((_,index) => (
                console.log("TO BI NAJ BIL INDEX ", index),
                console.log("TO BI NAJ BIL INDEX "),
                <View key={index} style={styles.inputContainer} >
                    <UrejanjeVnosa name="Odgovor" value={odgovori[index]?.odgovor || ''} onEnteredValue={(value: string) => {const newAnswers = [...odgovori]; newAnswers[index] = {odgovor: value, pravilen: false}; setOdgovori(newAnswers)}} />
                    
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
            <Button title={questionToEdit ? 'Shrani spremembe' : 'Shrani dodatno vprašanje'} onPress={saveQuestion} />
        </View>
    );
};

export default UrejanjeDodatnegaVprasanja;