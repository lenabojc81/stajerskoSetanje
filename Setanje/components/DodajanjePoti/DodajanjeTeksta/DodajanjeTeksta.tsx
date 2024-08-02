import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import styles from "./styles";

interface DodajanjeTekstaProps {
    name: string;
    value: string;
    onEnteredValue: (value: string) => void;
}

const DodajanjeTeksta: React.FC<DodajanjeTekstaProps> = ({name, onEnteredValue, value}) => {
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

export default DodajanjeTeksta;