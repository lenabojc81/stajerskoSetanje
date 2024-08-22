import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingTop: 70
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
   
      card: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: "#E0EFDE",
      },
      button: {
        marginHorizontal: 8,
        backgroundColor: "gray",
      },

});

export default styles;