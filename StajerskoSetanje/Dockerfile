FROM node:18

WORKDIR /app

# Install new Expo CLI globally
RUN npm install -g expo

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Install/update Expo-specific dependencies
RUN npx expo install

EXPOSE 19000 19001 19002

# Start the Expo development server
CMD ["npx", "expo", "start"]