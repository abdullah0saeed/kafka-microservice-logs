FROM node:18-alpine

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY package*.json ./
RUN npm install

USER app

COPY . .

# using run dev to run the app using nodemon
CMD ["npm", "run", "dev"] 