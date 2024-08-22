import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    selectedButton: {
        backgroundColor: 'green',
    },
    unselectedButton: {
        backgroundColor: 'gray',
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    card: {
        marginBottom: 5,
        backgroundColor: "#A8B8A6",
        padding: 8,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#E0EFDE',
        padding: 10,
        borderRadius: 5,
        width: '85%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    selectedAnswer: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#A8B8A6',
        textAlign: 'center',
        textTransform: 'uppercase',
        margin: 10,
    },

});

export default styles;