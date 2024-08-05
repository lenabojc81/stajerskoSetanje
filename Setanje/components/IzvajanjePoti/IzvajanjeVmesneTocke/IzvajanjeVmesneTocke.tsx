import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import IPot from '../../../models/IPot';
import IVmesnaTocka from '../../../models/IVmesnaTocka';
import ILokacija from '../../../models/ILokacija';
import Zemljevid from '../Zemljevid/Zemljevid';
import { haversineDistance } from '../Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama';
import ImageUpload from '../../visionApi';
import { baseUrl } from '../../../global';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IzvajanjeVmesneTockeProps {
    index: number;
    vmesna_tocka: IVmesnaTocka;
    onIndexChange: (index: number) => void;
}

interface IOdgovor {
    odgovor: string;
}

interface IMozniOdgovori {
    lokacija: ILokacija;
    odgovor: IOdgovor;
}

const IzvajanjeVmesneTocke: React.FC<IzvajanjeVmesneTockeProps> = ({index, vmesna_tocka, onIndexChange}) => {
    const [selectedEndLocation, setSelectedEndLocation] = React.useState<ILokacija | null>(null);
    const [showAIButton, setShowAIButton] = React.useState<boolean>(false);
    const [mozniOdgovori, setMozniOdgovori] = useState<IMozniOdgovori[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(-1);
    const [locationAtEnd, setLocationAtEnd] = useState<ILokacija | null>(null);
    const [rightLocation, setRightLocation] = useState<boolean>(false);

    useEffect (() => {
        fetchAnswers();
    }, [vmesna_tocka]);

    const fetchAnswers = async () => {
        try {
            const response = await fetch(`${baseUrl}/pridobiOdgovore/${vmesna_tocka.odgovor.tip_odgovor}/${vmesna_tocka.odgovor.odgovor}`);
            const data = await response.json();
            let extract: IMozniOdgovori[] = data.map((item: any) => item.vmesne_tocke);
            extract.push({'lokacija': vmesna_tocka.lokacija, 'odgovor': {'odgovor': vmesna_tocka.odgovor.odgovor}});
            extract.sort(() => Math.random() - 0.5);
            setMozniOdgovori(extract);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLocationUpdate = (currentLocation: ILokacija) => {
        if (selectedEndLocation == null) return;
        const distanceToStart = haversineDistance(currentLocation, selectedEndLocation);
        if (distanceToStart <= 50) {
          setShowAIButton(true);
          setLocationAtEnd(currentLocation);
        } else {
          setShowAIButton(false);
        }
    }; 

    const selectedDestination = (mo: IMozniOdgovori, index: number) => {
        setSelectedEndLocation(mo.lokacija);
        setSelectedButtonIndex(index);
        setSelectedAnswer(mo.odgovor.odgovor);
    };

    const resetAnswer = () => {
        setSelectedEndLocation(null);
        setSelectedButtonIndex(-1);
        setSelectedAnswer('');
        setShowAIButton(false);
    };

    const nextMidwayPoint = () => {
        setSelectedEndLocation(null);
        setShowAIButton(false);
        setMozniOdgovori([]);
        setSelectedAnswer('');
        setSelectedButtonIndex(-1);
        setLocationAtEnd(null);
        setRightLocation(false);
        onIndexChange(index + 1);
    };

    const checkLocation = () => {
        if (locationAtEnd == null) return;
        const distance = haversineDistance(locationAtEnd, vmesna_tocka.lokacija);
        if (distance <= 50) {
            setRightLocation(true);
        } else {
            setRightLocation(false);
        }
    };

    return (
        <ScrollView>
            <View>
                <Text>{index}</Text>
            <Text>uganka: {vmesna_tocka.uganka}, {vmesna_tocka.odgovor.odgovor}</Text>
            {selectedButtonIndex == -1 && mozniOdgovori.map((mo, index) => (
                <Button key={index} onPress={() => selectedDestination(mo, index)} title={mo.odgovor.odgovor} />
            ))}
            </View>
            {selectedEndLocation != null && (
                <View>
                    <Text>{selectedAnswer}</Text>
                <SafeAreaView>
                    <Zemljevid endLocation={selectedEndLocation} onLocationUpdate={handleLocationUpdate} /> 
                </SafeAreaView>
                <Button onPress={() => resetAnswer()} title='Spremeni odgovor' />
                </View>
            )}
            {/* ne morem testirat */}
            {showAIButton && (
                <View>
                    <ImageUpload />
                    <Button title='preveri okolico' onPress={checkLocation} />
                </View>
            )}
            {rightLocation && (
                <View>
                    <Text>right</Text>
                    <Button title='na naslednjo točko' onPress={nextMidwayPoint} />
                </View>
            )}
        </ScrollView>
    );
};

export default IzvajanjeVmesneTocke;