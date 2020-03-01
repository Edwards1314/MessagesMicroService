FROM node:12

#create directory
RUN mkdir -p /usr
WORKDIR /usr

COPY package*.json .
RUN npm install
COPY . .

RUN npm run start

EXPOSE 8080
CMD ["npm", "start"] 
