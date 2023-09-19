import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'

export default function OTPTimer({ expiryTimeInSeconds, onTimeout }) {

    const [timer, setTimer] = useState(expiryTimeInSeconds);

//This is use effect function,when time is zoro for otp then aain generate time for otp
    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        else {
            onTimeout(); // Callback when the timer reaches 0
        }

        // Clean up the interval when the component unmounts or the timer expires
        return () => clearInterval(interval);

    }, [timer, onTimeout]);


    // This is calculation function for time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
            <Text >Resend in {' '}</Text>
            <Text >{formatTime(timer)}</Text>
            <Text >{' '}sec.</Text>
        </View>
    );
};