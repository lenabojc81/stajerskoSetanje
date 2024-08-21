import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const OPENAI_API_KEY = "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"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const encodeImage = async (imageUri: string) => {
  return await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};

export const getLandmarkDetailsFromImage = async (imageUri: string) => {
  try {
    const base64Image = await encodeImage(imageUri);

    const payload = {
      model: 'gpt-4o-mini', // Ensure you use the correct model with vision capabilities
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: "What's in this image? Please identify any landmarks and provide details such as the name, city, country, and approximate coordinates.",
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });

    if (response.status === 200) {
      return response.data.choices[0].message.content;
    } else {
      console.error('Unexpected response status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error communicating with GPT-4 Vision API:', error);
    return null;
  }
};
