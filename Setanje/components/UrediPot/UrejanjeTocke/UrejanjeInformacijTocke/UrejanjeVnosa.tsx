import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import styles from "../../UrejanjeTeksta/styles";

interface UrejanjeTekstaProps {
    name: string;
    onEnteredValue: (value: string) => void;
}

const UrejanjeTeksta: React.FC<UrejanjeTekstaProps> = ({name, onEnteredValue}) => {
    const { control } = useForm<FieldValues>();

    const handleChange = (value: string) => {
        onEnteredValue(value);
    }

    return (
        <View>
            <Controller
                control={control}
                name={name}
                render={({field: {value}}) => (
                    <TextInput
                        style={styles.input}
                        placeholder={name}
                        value={value}
                        onChangeText={handleChange}
                    />
                )}
            />
        </View>
    );
};

export default UrejanjeTeksta;