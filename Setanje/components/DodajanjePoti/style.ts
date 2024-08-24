import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5",
      },
      container: {
        padding: 16,
       
      },
      card: {
        marginVertical: 16,
        backgroundColor: "#E0EFDE",
      },
      input: {
        marginBottom: 16,
      },
      pickerContainer: {
        marginBottom: 16,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        overflow: "hidden",
      },
      picker: {
        height: 200,
        backgroundColor: "white",
      },
      button: {
        marginVertical: 16,
        backgroundColor: "gray",
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
      }
});

export default style;