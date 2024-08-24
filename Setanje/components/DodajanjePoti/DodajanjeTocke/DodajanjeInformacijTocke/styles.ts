import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerBig: {
        padding: 16,
    },
    removeButton: {
        backgroundColor: 'red',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        marginVertical: 16,
        backgroundColor: "#E0EFDE",
    },
    button: {
        marginTop: 16,
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 45,
        width: '90%',
        alignSelf: 'center',
    },
    buttonGreen: {
        marginTop: 16,
        backgroundColor: '#A8B8A6',
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
});

export default styles;