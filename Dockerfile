FROM node:12
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run start

EXPOSE 8080
CMD ["npm", "start"] 
