FROM node:22.4.0

WORKDIR /app

COPY package*json tsconfig.json src ./

RUN npm install
