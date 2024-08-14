import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [landmarks, setLandmarks] = useState<Array<{ name: string, score: number, locations: Array<{ latitude: number, longitude: number }> }>>([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permissions are required to take pictures.');
      }
    })();
  }, []);

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        await analyzeImage(result.assets[0].uri);
      } else {
        console.log('Image capture was canceled or no assets were returned.');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    try {
      // Convert the image to base64
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Construct the request payload
      const requestBody = {
        requests: [
          {
            image: {
              content: base64,  // This is where the base64 encoded image goes
            },
            features: [
              {
                type: "LANDMARK_DETECTION", // Specify the type of detection
                maxResults: 10, // Optional: limit the number of results
              },
            ],
          },
        ],
      };
  
      // Send the request to the Vision API
      const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBCdqn62fRmzmrUSaK98Q8166p7N9Qw18M', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Convert the requestBody to a JSON string
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', response.status, errorText);
        throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log('Google Vision API Response:', data); // Log the response for debugging
  
      // Check if the response contains landmarkAnnotations
      if (data.responses && data.responses[0].landmarkAnnotations) {
        setLandmarks(data.responses[0].landmarkAnnotations);
      } else {
        console.log('No landmarks detected');
        setLandmarks([]);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };
  
  return (
    <ScrollView>
      <Button title="Take a picture" onPress={takePicture} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {landmarks.map((landmark, index) => (
        <View key={index}>
          <Text>{`Landmark: ${landmark.name}`}</Text>
          <Text>{`Confidence: ${(landmark.score * 100).toFixed(2)}%`}</Text>
          {landmark.locations.map((location, locIndex) => (
            <Text key={locIndex}>{`Location: ${location.latitude}, ${location.longitude}`}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default ImageUpload;
