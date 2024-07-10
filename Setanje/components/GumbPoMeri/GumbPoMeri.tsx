import React from "react";
import { TouchableOpacity, Text, ViewStyle } from "react-native";
import styles from "./styles";

const CustomButton: React.FC<{ onPress: ()=> void, title: string, styleName?: keyof typeof styles }> = ({ onPress, title, styleName}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styleName && styles[styleName] as ViewStyle]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;