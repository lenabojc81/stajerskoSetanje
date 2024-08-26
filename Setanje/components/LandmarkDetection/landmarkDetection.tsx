import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert, Touchable, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getLandmarkDetailsFromImage } from './ChatGPTService';
import styles from '../IzvajanjePoti/IzvajanjeVmesneTocke/styles';
import ILokacija from '../../models/ILokacija';

interface ImageUploadProps {
  handlePicture: (picture: boolean) => void;
  isAdmin: boolean;
  handleLandmarkDetails: (location: ILokacija) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({handlePicture, isAdmin, handleLandmarkDetails}) => {
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
        handlePicture(true);
        if (!isAdmin) {
          const details = await getLandmarkDetailsFromImage(imageUri);
          console.log(details);
          setLandmarkDetails(details);
          const coordinates = extractCoordinates(details);
          if (coordinates) {
            console.log(`lat: ${coordinates.lat}, lng: ${coordinates.lng}`);
            handleLandmarkDetails({lat: Number(coordinates.lat), lng: Number(coordinates.lng)});
          }
        }
      } else {
        console.log('Image capture was canceled or no assets were returned.');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const extractCoordinates = (details: string) => {
    const regex = /(\d+\.\d+°\s[N|S])\slatitude\sand\s(\d+\.\d+°\s[E|W])\slongitude/;
    const match = details.match(regex);
    if (match) {
      const lat = match[1];
      const lng = match[2];
      return { lat, lng };
    }
    return null;
  };

  return (
    <View>
      <TouchableOpacity onPress={takePicture} style={styles.button}>
        <Text style={styles.buttonText}>Take a picture</Text>
      </TouchableOpacity>
      {image && !isAdmin && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {landmarkDetails && (
        <View>
          <Text>{landmarkDetails}</Text>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;