FROM node:18-alpine

RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

# Install app dependencies before coping to avoid re-installing them on every change
COPY package*.json ./
RUN npm install

COPY . .

# using run dev to run the app using nodemon
CMD ["npm", "run", "dev"] 