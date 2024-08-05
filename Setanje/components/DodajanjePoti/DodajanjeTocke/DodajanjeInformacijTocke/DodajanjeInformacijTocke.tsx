import React, { useEffect, useState } from "react";
import { View, Text, Button, Modal, TouchableOpacity } from "react-native";
import IVmesnaTocka from "../../../../models/IVmesnaTocka";
import DodajanjeTeksta from "../../DodajanjeTeksta/DodajanjeTeksta";
import { Picker } from "@react-native-picker/picker";
import DodajanjeDodatnegaVprasanja from "../DodajanjeDodatnegaVprasanja/DodajanjeDodatnegaVprasanja";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";
import { set } from "react-hook-form";
import DodajanjeVnosa from "./DodajanjeVnosa";

interface DodajanjeInformacijTockeProps {
    midwayPoint: IVmesnaTocka;
    onEnteredMidwayPoint: (value: IVmesnaTocka) => void;
    visability: boolean;
    onClose: () => void;
}

const DodajanjeInformacijTocke: React.FC<DodajanjeInformacijTockeProps> = ({midwayPoint, onEnteredMidwayPoint, visability, onClose}) => {
    const [marker, setMarker] = useState<IVmesnaTocka>(midwayPoint);
    const [visible, setVisible] = useState<boolean>(false);
    const [additionalQuestions, setAdditionalQuestions] = useState<IDodatnoVprasanje[]>([]);

    const handleAddQuestion = (data: IDodatnoVprasanje) => {
        setVisible(false);
        setAdditionalQuestions([...additionalQuestions, data]);
    }

    const saveMidwayPoint = () => {
        const newMidwayPoint = {...marker, dodatna_vprasanja: additionalQuestions};
        onEnteredMidwayPoint(newMidwayPoint);

        //console.log('newMidwayPoint', newMidwayPoint);
        setMarker(midwayPoint);
        setVisible(false);
        setAdditionalQuestions([]);
    }
    
    return (
        <Modal visible={visability} animationType="slide">
            <View>
                <Button title='Nazaj' onPress={onClose} />
                <DodajanjeVnosa name="Ime točke" onEnteredValue={(value: string) => setMarker({...marker, ime: value})} />
                <DodajanjeVnosa name="Uganka" onEnteredValue={(value: string) => setMarker({...marker, uganka: value})} />
                <DodajanjeVnosa name="Odgovor" onEnteredValue={(value: string) => setMarker({...marker, odgovor: {...midwayPoint.odgovor, odgovor: value}})} />
                <Text>Tip odgovora</Text>
                <Picker
                    selectedValue={marker.odgovor.tip_odgovor}
                    onValueChange={(itemValue) => setMarker({...marker, odgovor: {...marker.odgovor, tip_odgovor: itemValue}})}
                >
                    <Picker.Item label='besedilo' value='text' />
                    <Picker.Item label='število' value='number' />
                </Picker>
                <Button title='Dodaj dodatno vprašanje' onPress={() => setVisible(true)} />
                {visible && <DodajanjeDodatnegaVprasanja onAddQuestion={handleAddQuestion}/>}        
                <Button title='Dodaj točko' onPress={() => saveMidwayPoint()} disabled={additionalQuestions.length === 0}/>
            </View>
        </Modal>
    );
};

export default DodajanjeInformacijTocke;