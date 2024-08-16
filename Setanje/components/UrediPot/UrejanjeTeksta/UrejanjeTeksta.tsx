import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import styles from "./styles";

interface UrejanjeTekstaProps {
    name: string;
    value: string;
    onEnteredValue: (value: string) => void;
}

const UrejanjeTeksta: React.FC<UrejanjeTekstaProps> = ({name, onEnteredValue, value}) => {
    const { control } = useForm<FieldValues>();

    const handleChange = (text: string) => {
        onEnteredValue(text);
    }

    return (
        <View>
            <Controller
                control={control}
                name={name}
                render={() => (
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