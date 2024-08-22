import React from "react";
import { View, Text } from "react-native";

interface MerjenjeDistanceProps {
    distance: number;
}

const MerjenjeDistance: React.FC<MerjenjeDistanceProps> = ({ distance }) => {

    return (
        <View>
            {/* <Text>Prehojena pot: {distance.toFixed(2)} m</Text> */}
        </View>
    );
}

export default MerjenjeDistance;