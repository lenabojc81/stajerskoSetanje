import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {

    function add(number1:number, number2:number):void{
        console.log('added', number1 + number2);
    }
  return (
    <View style={styles.container}>
      <Text>Map</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
