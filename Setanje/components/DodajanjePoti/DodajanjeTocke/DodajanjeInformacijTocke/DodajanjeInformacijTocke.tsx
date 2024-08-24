import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import IVmesnaTocka from "../../../../models/IVmesnaTocka";
import DodajanjeTeksta from "../../DodajanjeTeksta/DodajanjeTeksta";
import { Picker } from "@react-native-picker/picker";
import DodajanjeDodatnegaVprasanja from "../DodajanjeDodatnegaVprasanja/DodajanjeDodatnegaVprasanja";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";
import { set } from "react-hook-form";
import DodajanjeVnosa from "./DodajanjeVnosa";
import styles from "./styles";
import { Card } from "react-native-paper";

interface DodajanjeInformacijTockeProps {
  midwayPoint: IVmesnaTocka;
  onEnteredMidwayPoint: (value: IVmesnaTocka) => void;
  visability: boolean;
  onClose: () => void;
}

const DodajanjeInformacijTocke: React.FC<DodajanjeInformacijTockeProps> = ({
  midwayPoint,
  onEnteredMidwayPoint,
  visability,
  onClose,
}) => {
  const [marker, setMarker] = useState<IVmesnaTocka>(midwayPoint);
  const [visible, setVisible] = useState<boolean>(false);
  const [additionalQuestions, setAdditionalQuestions] = useState<
    IDodatnoVprasanje[]
  >([]);

  const handleAddQuestion = (data: IDodatnoVprasanje) => {
    setVisible(false);
    setAdditionalQuestions([...additionalQuestions, data]);
  };

  const saveMidwayPoint = () => {
    const newMidwayPoint = {
      ...marker,
      dodatna_vprasanja: additionalQuestions,
    };
    onEnteredMidwayPoint(newMidwayPoint);

    //console.log('newMidwayPoint', newMidwayPoint);
    //console.log('questions', additionalQuestions.length);
    setMarker(midwayPoint);
    setVisible(false);
    setAdditionalQuestions([]);
  };

  const handleOnClose = () => {
    onClose();
    setMarker(midwayPoint);
    setVisible(false);
    setAdditionalQuestions([]);
  };

  const validateFields = () => {
    if (additionalQuestions.length === 0) {
        Alert.alert("Napaka", "Dodaj vsaj eno dodatno vprašanje.");
        return false;
    }
    if (marker.ime === "" || !marker.ime) {
      Alert.alert("Napaka", "Ime točke ne sme biti prazno.");
      return false;
    }
    if (!marker.uganka || !marker.uganka.trim()) {
      Alert.alert("Napaka", "Uganka ne sme biti prazna.");
      return false;
    }
    if (
      !marker.odgovor ||
      !marker.odgovor.odgovor ||
      !marker.odgovor.odgovor.trim()
    ) {
      Alert.alert("Napaka", "Odgovor ne sme biti prazen.");
      return false;
    }
    if (
      !marker.odgovor ||
      !marker.odgovor.tip_odgovor ||
      !marker.odgovor.tip_odgovor.trim()
    ) {
      Alert.alert("Napaka", "Tip odgovora ne sme biti prazen.");
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
    <Modal visible={visability} animationType="slide">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.containerBig}>
          <Card style={styles.card}>
            <Card.Content>
              <DodajanjeVnosa
                name="Ime točke"
                onEnteredValue={(value: string) =>
                  setMarker({ ...marker, ime: value })
                }
              />
              <DodajanjeVnosa
                name="Uganka"
                onEnteredValue={(value: string) =>
                  setMarker({ ...marker, uganka: value })
                }
              />
              <DodajanjeVnosa
                name="Odgovor"
                onEnteredValue={(value: string) =>
                  setMarker({
                    ...marker,
                    odgovor: { ...midwayPoint.odgovor, odgovor: value },
                  })
                }
              />
              <Text>Tip odgovora</Text>

              <Picker
                selectedValue={marker.odgovor.tip_odgovor}
                onValueChange={(itemValue) =>
                  setMarker({
                    ...marker,
                    odgovor: { ...marker.odgovor, tip_odgovor: itemValue },
                  })
                }
              >
                <Picker.Item label="zanemnitosti/zgradbe" value="landmark" />
                <Picker.Item label="datum/leto" value="date" />
                <Picker.Item label="mesto/kraj" value="city" />
                <Picker.Item label="ulica/cesta" value="street" />
                <Picker.Item label="oseba/ime" value="person" />
                <Picker.Item label="številka" value="number" />
                <Picker.Item label="dogodek" value="event" />
                <Picker.Item label="barva" value="color" />
                <Picker.Item label="predmet/izdelek" value="object" />
                <Picker.Item label="hrana/pijača" value="food" />
              </Picker>
            </Card.Content>
          </Card>
          {!visible && (
            // <Button
            //   title="Dodaj dodatno vprašanje"
            //   onPress={() => setVisible(true)}
            // />
            <TouchableOpacity style={styles.buttonGreen} onPress={() => setVisible(true)}>
                <Text style={styles.buttonText}>Dodaj dodatno vprašanje</Text>
            </TouchableOpacity>
          )}
          {visible && (
            <DodajanjeDodatnegaVprasanja onAddQuestion={handleAddQuestion} />
          )}
          {additionalQuestions.length !== 0 &&
            additionalQuestions.map((question, index) => (
              <View key={index} style={styles.container}>
                <Text>{question.vprasanje}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() =>
                    setAdditionalQuestions(
                      additionalQuestions.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          {/* <Button
            title="Dodaj točko"
            onPress={() => handleSaveMidwayPoint()}
            disabled={additionalQuestions.length === 0}
          /> */}
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleSaveMidwayPoint}>
          <Text style={styles.buttonText}>Shrani</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOnClose}>
            <Text style={styles.buttonText}>Nazaj</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DodajanjeInformacijTocke;
