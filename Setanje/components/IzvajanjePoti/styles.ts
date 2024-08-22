import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardLight: {
        marginBottom: 5,
        backgroundColor: "#E0EFDE",
        padding: 8,
        alignContent: 'center',
    },
    card: {
        marginBottom: 5,
        backgroundColor: "#A8B8A6",
        padding: 8,
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    purpleButton: {
        marginTop: 16,
        backgroundColor: '#EF6F6F',
        padding: 10,
        borderRadius: 45,
        width: '90%',
        alignSelf: 'center',
    },
    grayButton: {
        marginTop: 16,
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 45,
        width: '90%',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    bottomOfPage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
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
        textTransform: 'uppercase',
    },
    cong: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#A8B8A6',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    opr: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#A8B8A6',
        textAlign: 'center',
        textTransform: 'lowercase',
    },
    text: {
        color: 'black',
        fontSize: 15,
        margin: 5,
        textAlign: 'center',
    },
});

export default styles;