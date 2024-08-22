import React, { useEffect, useState } from "react";
import { View, Text, Button, Touchable, TouchableOpacity, Modal } from "react-native";
import IDodatnoVprasanje from "../../../../models/IDodatnoVprasanje";
import IUPDodatnoVprasanje from "../../../../models/IUPDodatnoVprasanje";
import IUporabnikPot from "../../../../models/IUporabnikPot";
import { set } from "react-hook-form";
import styles from "../styles";
import { Card } from "react-native-paper";

interface DodatnaVprasanjaProps {
    index: number;
    additionalQuestion: IDodatnoVprasanje;
    onIndexChange: (index: number, correct: boolean, additionalQuestionUser: IUPDodatnoVprasanje) => void;
    // setUporabnikPot: (updater: (uporabnikPot: IUporabnikPot) => IUporabnikPot) => void;
    setUserAdditionalPoints: (updater: (userAdditionalPoints: IUPDodatnoVprasanje[]) => IUPDodatnoVprasanje[]) => void;
};

interface IDodatniOdgovori  {
    odgovor: string;
    pravilen: boolean;
};

const DodatnaVprasanja: React.FC<DodatnaVprasanjaProps> = ({index, additionalQuestion, onIndexChange, setUserAdditionalPoints}) => {
    const [shuffledAnswers, setShuffledAnswers] = useState<IDodatniOdgovori[]>([...additionalQuestion.odgovori]);

    const nextAdditionalQuestion = (correct: boolean, answer: string) => {
        const additionalQuestionUser: IUPDodatnoVprasanje = {
            vprasanje: {
                vprasanje: additionalQuestion.vprasanje,
                pravilen_odgovor: additionalQuestion.odgovori.find((odgovor) => odgovor.pravilen)?.odgovor || '',
            },
            izbran_odgovor: answer,
        };
        // setUporabnikPot((prevState: IUporabnikPot): IUporabnikPot => {
        //     const updatedVmesneTocke = [...prevState.vmesne_tocke];
        //     updatedVmesneTocke[index].dodatna_vprasanja.push(additionalQuestionUser);
        //     return {
        //         ...prevState,
        //         vmesne_tocke: updatedVmesneTocke,
        //     };
        // });
        setUserAdditionalPoints((prevState: IUPDodatnoVprasanje[]): IUPDodatnoVprasanje[] => {
            const updatedUserAdditionalPoints = [...prevState];
            updatedUserAdditionalPoints.push(additionalQuestionUser);
            return updatedUserAdditionalPoints;
        });
        onIndexChange(index + 1, correct, additionalQuestionUser);
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
        <Card style={styles.card}>
            <Card.Content>
                <Text style={styles.question}>{additionalQuestion.vprasanje}</Text>
            </Card.Content>
        </Card>
        {shuffledAnswers.map((odgovor, index) => (
            <View key={index}>
                <TouchableOpacity style={styles.button} onPress={() => nextAdditionalQuestion(odgovor.pravilen, odgovor.odgovor)}>
                    <Text style={styles.buttonText}>{odgovor.odgovor}</Text>
                </TouchableOpacity>
            </View>
        ))}
    </View>
    </Modal>
  );
};

export default DodatnaVprasanja;