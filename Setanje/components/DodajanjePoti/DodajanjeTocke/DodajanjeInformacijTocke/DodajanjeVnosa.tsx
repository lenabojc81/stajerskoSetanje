import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import styles from "../../DodajanjeTeksta/styles";

interface DodajanjeTekstaProps {
    name: string;
    onEnteredValue: (value: string) => void;
}

const DodajanjeTeksta: React.FC<DodajanjeTekstaProps> = ({name, onEnteredValue}) => {
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

export default DodajanjeTeksta;