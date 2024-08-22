import { container } from "googleapis/build/src/apis/container";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 10,
    },
    card: {
        marginBottom: 5,
        backgroundColor: "#E0EFDE"
    },
    cardPath: {
        marginBottom: 5,
        backgroundColor: "#A8B8A6",
        padding: 8,
    },
    titlePath: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    textPath: {
        color: 'white',
    },
    button: {
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;