import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { baseUrl } from "../../global";
import { Text, Button, Card } from 'react-native-paper';
import styles from "./styles";

interface ILestvica {
    _id: string;
    skupneTocke: number;
    uporabnik_naziv: string;
}


const pridobiLestvico = async (setLestvica: (lestvica: ILestvica[]) => void) => {
    try {
        const response = await fetch(`${baseUrl}/api/userPath/lestvica`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Response:', response);
        if (!response.ok) throw new Error('Neuspešno pridobivanje podatkov');
        const data: ILestvica[] = await response.json();
        console.log('Data:', data);
        setLestvica(data);
    } catch (error) {
        console.error(error);
        console.log('Napaka pri pridobivanju podatkov za lestvico');
    }
};

const Lestvica: React.FC = () => {
    const [lestvica, setLestvica] = useState<ILestvica[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLestvica = async () => {
            setLoading(true);
            try {
                await pridobiLestvico(setLestvica);
            } catch (err) {
                setError('Napaka pri pridobivanju lestvice');
            } finally {
                setLoading(false);
            }
        };

        fetchLestvica();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!lestvica.length) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Nobeni podatki na voljo</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Lestvica</Text>
            </View>
            <FlatList
                data={lestvica}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <Card style={[styles.card, getTopThreeStyle(index)]}>
                        <Card.Content style={styles.cardContent}>
                            <Text style={styles.rank}>{index + 1}</Text>
                            <Text style={styles.name}>{item.uporabnik_naziv}</Text>
                            <Text style={styles.points}>{item.skupneTocke}</Text>
                        </Card.Content>
                    </Card>
                )}
            />
            <Button mode="contained" onPress={() => pridobiLestvico(setLestvica)} style={styles.button}>
                Osveži lestvico
            </Button>
        </View>
    );
};


const getTopThreeStyle = (index: number) => {
    switch (index) {
        case 0:
            return styles.topThreeFirst;
        case 1:
            return styles.topThreeSecond;
        case 2:
            return styles.topThreeThird;
        default:
            return {};
    }
};



export default Lestvica;
