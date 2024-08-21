import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getLandmarkDetailsFromImage } from './/ChatGPTService';

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [landmarkDetails, setLandmarkDetails] = useState<string | null>(null);

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [6, 13],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);

        const details = await getLandmarkDetailsFromImage(imageUri);
        setLandmarkDetails(details);
      } else {
        console.log('Image capture was canceled or no assets were returned.');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  return (
    <View>
      <Button title="Take a picture" onPress={takePicture} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {landmarkDetails && (
        <View>
          <Text>{landmarkDetails}</Text>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;