import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    map: {
        height: 300,
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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
});

export default styles;