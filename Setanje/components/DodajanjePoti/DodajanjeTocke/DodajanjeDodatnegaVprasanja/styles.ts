import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeButton: {
        backgroundColor: '#EF6F6F',
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
    addButton: {
        backgroundColor: '#A8B8A6',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: "#E0EFDE",
    },
    saveButton: {
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
    }
});

export default styles;