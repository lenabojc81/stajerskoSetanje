import React, { useState } from "react";
import { Controller, FieldValues, useForm  } from "react-hook-form";
import { TextInput, View, Text } from "react-native";
import styles from "../../UrejanjeTeksta/styles";

interface UrejanjeTekstaProps {
    name: string;
    value?: string; 
    onEnteredValue: (value: string) => void;
}

const UrejanjeTeksta: React.FC<UrejanjeTekstaProps> = ({name, value = '', onEnteredValue}) => {
    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onEnteredValue}
                placeholder={`Enter ${name}`}
            />
        </View>
    );
};

export default UrejanjeTeksta;