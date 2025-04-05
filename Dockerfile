FROM node:18-alpine
# create a non-root user
RUN addgroup -S app && adduser -S app -G app
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# Map source code to container
VOLUME [".","/app"]
# Start the app
CMD ["npm", "run", "dev"]