import { ImagePickerResult } from 'expo-image-picker';
import { readAsStringAsync } from 'expo-file-system';
import * as GoogleVisionAPI from 'googleapis';

const { google } = GoogleVisionAPI;

const vision = google.vision('v1');

export const getImageAnnotations = async (imageUri: string) => {
  const imageBase64 = await readAsStringAsync(imageUri, { encoding: 'base64' });

  const auth = new google.auth.GoogleAuth({
    keyFile: './config/google-cloud-key.json', // Adjust the path as needed
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  google.options({ auth });

  const request = {
    requests: [
      {
        image: {
          content: imageBase64,
        },
        features: [
          {
            type: 'LANDMARK_DETECTION',
            maxResults: 10,
          },
        ],
      },
    ],
  };

  const response = await vision.images.annotate({
    requestBody: request,
  });

  const landmarks = response.data.responses[0].landmarkAnnotations.map(
    (landmark: any) => landmark.description
  );

  return landmarks;
};
