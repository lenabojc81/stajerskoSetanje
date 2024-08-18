import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
        padding: 10,
        backgroundColor: "white",
        width: '100%',
      },
      scrollContainer: {
        paddingBottom: 20,
        paddingTop: 40,
      },
      card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#E0EFDE',
      },
      input: {
        marginVertical: 10,
      },
      label: {
        marginVertical: 10,
        fontSize: 16,
      },
      pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: "white",
      },
      picker: {
        height: 50,
        backgroundColor: "white",
      },
      button: {
        marginVertical: 10,
        backgroundColor: 'gray',
      },
      questionContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
      },
      questionText: {
        flex: 1,
        fontSize: 16,
      },
      editButton: {
        marginLeft: 10,
        backgroundColor: 'lightgray',
      },
      saveButton: {
        marginTop: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
      },
      removeButtonn: {
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
      },
          
});

export default styles;