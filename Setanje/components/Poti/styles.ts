import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    pathItem: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    pathName: {
        fontSize: 16,
    },
    markerItem: {
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default styles;