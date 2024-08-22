import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert, ScrollView } from "react-native";
import IVmesnaTocka from "../../../../models/IVmesnaTocka";
import UrejanjeTeksta from "../../UrejanjeTeksta/UrejanjeTeksta";
import { Picker } from "@react-native-picker/picker";
import UrejanjeDodatnegaVprasanja from "../UrejanjeDodatnegaVprasanja/UrejanjeDodatnegaVprasanja";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";
import { set } from "react-hook-form";
import UrejanjeVnosa from "./UrejanjeVnosa";
import styles from "./styles";
import { Modal, Button, Text, TextInput, Card, IconButton } from 'react-native-paper';
interface UrejanjeInformacijTockeProps {
    midwayPoint: IVmesnaTocka;
    onEnteredMidwayPoint: (value: IVmesnaTocka) => void;
    visability: boolean;
    onClose: () => void;
}

const UrejanjeInformacijTocke: React.FC<UrejanjeInformacijTockeProps> = ({ midwayPoint, onEnteredMidwayPoint, visability, onClose }) => {
    const [marker, setMarker] = useState<IVmesnaTocka>(midwayPoint);
    const [visible, setVisible] = useState<boolean>(true);
    const [additionalQuestions, setAdditionalQuestions] = useState<IDodatnoVprasanje[]>([]);
    const [editingQuestion, setEditingQuestion] = useState<IDodatnoVprasanje | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setMarker(midwayPoint);
        setAdditionalQuestions(midwayPoint.dodatna_vprasanja || []);
    }, [midwayPoint]);

    //console.log('midwayPoint v urejanju informacij točke', midwayPoint);

    const handleAddQuestion = (data: IDodatnoVprasanje) => {
        setVisible(false);
        setAdditionalQuestions([...additionalQuestions, data]);
        setEditingQuestion(null);
    };
  //  console.log("markerji v urejnanju informacij točke!!!!!!!!!!!!!!", marker);

    const handleEditQuestion = (question: IDodatnoVprasanje) => {
        setEditingQuestion(question);
        setIsEditing(true);
    };

    const handleEditVmesnaTocka = (data: IVmesnaTocka) => {
        setMarker(data);
    };


    const handleEditComplete = (updatedQuestion: IDodatnoVprasanje) => {
        setAdditionalQuestions(additionalQuestions.map(q => q === editingQuestion ? updatedQuestion : q));
        setEditingQuestion(null);
        setIsEditing(false);
    };



    const saveMidwayPoint = () => {
        const updatedMidwayPoint = { ...marker, dodatna_vprasanja: additionalQuestions };
        onEnteredMidwayPoint(updatedMidwayPoint);
        setVisible(true);
    };

    const handleOnClose = () => {
        onClose();
        setMarker(midwayPoint);
        setVisible(false);
        setAdditionalQuestions([]);
    };
    console.log("marker ime", marker.ime);
    const validateFields = () => {
        if (marker.ime === '' || !marker.ime) {
            Alert.alert('Napaka', 'Ime točke ne sme biti prazno.');
            return false;
        }
        if (!marker.uganka || !marker.uganka.trim()) {
            Alert.alert('Napaka', 'Uganka ne sme biti prazna.');
            return false;
        }
        if (!marker.odgovor || !marker.odgovor.odgovor || !marker.odgovor.odgovor.trim()) {
            Alert.alert('Napaka', 'Odgovor ne sme biti prazen.');
            return false;
        }
        if (!marker.odgovor || !marker.odgovor.tip_odgovor || !marker.odgovor.tip_odgovor.trim()) {
            Alert.alert('Napaka', 'Tip odgovora ne sme biti prazen.');
            return false;
        }
        return true;
    };

    const handleSaveMidwayPoint = () => {
        // console.log('marker', marker);

        if (!validateFields()) {
            // console.log('validateFields', validateFields());
            return;
        }
        // console.log('validateFields', validateFields());
        saveMidwayPoint();
    };

    return (
        <Modal visible={visability} onDismiss={handleOnClose} contentContainerStyle={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Card style={styles.card}>
                    <Card.Title title="Urejanje Informacij Tocke" />
                    <Card.Content>
                        <Button mode="contained" onPress={handleOnClose} style={styles.button}>
                            Nazaj
                        </Button>
                        <UrejanjeVnosa name="Ime točke" value={marker.ime} onEnteredValue={(value: string) => setMarker({ ...marker, ime: value })} />
                        <UrejanjeVnosa name="Uganka" value={marker.uganka} onEnteredValue={(value: string) => setMarker({ ...marker, uganka: value })} />
                        <UrejanjeVnosa name="Odgovor" value={marker.odgovor.odgovor} onEnteredValue={(value: string) => setMarker({ ...marker, odgovor: { ...midwayPoint.odgovor, odgovor: value } })} />
                        <Text>Tip odgovora</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={marker.odgovor.tip_odgovor}
                                onValueChange={(itemValue) => setMarker({ ...marker, odgovor: { ...marker.odgovor, tip_odgovor: itemValue } })}
                            
                            >
                                <Picker.Item label='zanemnitosti/zgradbe' value='landmark' />
                                <Picker.Item label='datum/leto' value='date' />
                                <Picker.Item label='mesto/kraj' value='city' />
                                <Picker.Item label='ulica/cesta' value='street' />
                                <Picker.Item label='oseba/ime' value='person' />
                                <Picker.Item label='številka' value='number' />
                                <Picker.Item label='dogodek' value='event' />
                                <Picker.Item label='barva' value='color' />
                                <Picker.Item label='predmet/izdelek' value='object' />
                                <Picker.Item label='hrana/pijača' value='food' />

                            </Picker>
                        </View>
                        {visible && (
                            <Button
                                mode="contained"
                                onPress={() => setVisible(true)}
                                style={styles.button}
                            >
                                Dodaj dodatno vprašanje
                            </Button>
                        )}
                        {isEditing && <UrejanjeDodatnegaVprasanja onAddQuestion={handleAddQuestion} questionToEdit={editingQuestion || undefined}
                            onEditComplete={handleEditComplete} />}
                        {additionalQuestions.length !== 0 && (
                            additionalQuestions.map((question, index) => (
                                <View key={index} style={styles.questionContainer}>
                                    <Text style={styles.questionText}>{question.vprasanje}</Text>
                                    <IconButton style={styles.removeButtonn}
                                        icon="delete"
                                        size={20}
                                        onPress={() =>
                                            setAdditionalQuestions(additionalQuestions.filter((_, i) => i !== index))
                                        }
                                    />
                                    <Button mode="contained" onPress={() => handleEditQuestion(question)} style={styles.editButton}>
                                        Uredi
                                    </Button>
                                </View>
                            ))
                        )}

                        <Button
                            mode="contained"
                            onPress={handleSaveMidwayPoint}
                            
                            style={styles.saveButton}
                            
                        >   
                            Shrani točko
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>
        </Modal>
    );
};

export default UrejanjeInformacijTocke;