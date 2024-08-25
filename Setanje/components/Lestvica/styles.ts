import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
    },
    card: {
        
        marginTop: 25,
        marginHorizontal: 15,
    },
    topThree: {
        backgroundColor: '#e3f2fd', 
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 7,
    },
    rank: {
        fontSize: 18,
        width: 30,
    },
    name: {
        fontSize: 18,
        flex: 1,
        textAlign: 'left',
    },
    points: {
        fontSize: 18,
        width: 80,
        textAlign: 'right',
    },
    headerContainer: {
        backgroundColor: '#A8B8A6',
        paddingTop: 60,
        paddingBottom: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: 'gray',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      topThreeFirst: {
        backgroundColor: '#FEBD14', 
    },
    topThreeSecond: {
        backgroundColor: '#CCCCCC', 
    },
    topThreeThird: {
        backgroundColor: '#B8860B', 
    },
    gradientBackground: {
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    
});

export default styles;