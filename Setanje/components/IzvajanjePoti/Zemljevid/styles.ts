import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        borderRadius: 3,
        margin: 1,
        padding: 10,
        alignItems: 'center',
    },
    firstButton: {
        marginTop: 50,
    },
    secondButton: {
        marginTop: -10,
    },
    goToButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;