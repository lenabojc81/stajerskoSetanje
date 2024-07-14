import React from 'react';
import { View, Text, Button } from 'react-native';
import IPot from '../../../models/IPot';
import IVmesnaTocka from '../../../models/IVmesnaTocka';
import ILokacija from '../../../models/ILokacija';
import Zemljevid from '../Zemljevid/Zemljevid';
import { haversineDistance } from '../Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama';
import ImageUpload from '../../visionApi';

interface IzvajanjeVmesneTockeProps {
    vmesna_tocka: IVmesnaTocka;
}

const IzvajanjeVmesneTocke: React.FC<IzvajanjeVmesneTockeProps> = ({vmesna_tocka}) => {
    const [selectedEndLocation, setSelectedEndLocation] = React.useState<ILokacija | null>(null);
    const [showAIButton, setShowAIButton] = React.useState<boolean>(false);

    const handleLocationUpdate = (currentLocation: ILokacija) => {
        if (selectedEndLocation == null) return;
        const distanceToStart = haversineDistance(currentLocation.coords, selectedEndLocation.coords);
        if (distanceToStart <= 50) {
          setShowAIButton(true);
        } else {
          setShowAIButton(false);
        }
    };

    // pridobi 3 odgovore določenega tipa iz baze + random prikaz buttonov 

    return (
        <View>
            <View>
            <Text>uganka: {vmesna_tocka.uganka}</Text>
            {/* 
            <Button title='odgovor1' onPress={() => setSelectedEndLocation(vmesna_tocka.odgovor.lokacija)} />
            <Button title='odgovor2' onPress={() => setSelectedEndLocation(vmesna_tocka.odgovori[1].lokacija)} />
            <Button title='odgovor3' onPress={() => setSelectedEndLocation(vmesna_tocka.odgovori[2].lokacija)} />
            <Button title='odgovor4' onPress={() => setSelectedEndLocation(vmesna_tocka.odgovori[3].lokacija)} /> */}
            </View>
            {selectedEndLocation != null && (
                <View>
                    <Zemljevid endLocation={selectedEndLocation} onLocationUpdate={handleLocationUpdate} /> 
                </View>
            )}
            {/* ne morem testirat */}
            {showAIButton && (
                <View>
                    <ImageUpload />
                </View>
            )}
        </View>
    );
};

export default IzvajanjeVmesneTocke;