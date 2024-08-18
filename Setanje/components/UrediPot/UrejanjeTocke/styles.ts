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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      editButton: {
        marginTop: 10,
      },
      editButtonText: {
        color: 'blue',
      },
      calloutView: {
        maxWidth: 300, // Omejitev širine Callout
        padding: 5,
      },
      calloutText: {
        fontSize: 14, // Velikost pisave
        color: '#000', // Barva besedila
      },
});

export default styles;