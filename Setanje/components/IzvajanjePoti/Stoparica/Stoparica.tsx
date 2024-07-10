import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

interface StoparicaProps {
    startTime: Date;
}

const Stoparica: React.FC<StoparicaProps> = ({ startTime }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const calculateElapsedTime = () => {
            const now = new Date();
            const elapsedTime = Math.floor((now.getTime() - startTime.getTime()) / 1000);
            setTime(elapsedTime);
        };

        let interval: NodeJS.Timeout | undefined = undefined;
        if (isRunning) {
            interval = setInterval(calculateElapsedTime, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const formatTime = (seconds: number) => {
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const hours = Math.floor(seconds / 3600);
        const getHours = `0${hours}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    return (
        <View>
            <Text>{formatTime(time)}</Text>
        </View>
    );
};

export default Stoparica;
