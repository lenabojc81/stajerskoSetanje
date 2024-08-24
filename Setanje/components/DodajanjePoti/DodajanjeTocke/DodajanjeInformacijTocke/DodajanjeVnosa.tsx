import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
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
                        style={{marginBottom: 16}}
                        placeholder={name}
                        value={value}
                        mode="outlined"
                        onChangeText={handleChange}
                    />
                )}
            />
        </View>
    );
};

export default DodajanjeTeksta;