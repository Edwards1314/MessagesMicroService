FROM node:12

#create directory
RUN mkdir -p /usr
RUN ls src
WORKDIR /usr/

COPY package.json ./
RUN npm install
COPY . ./
RUN ls src

EXPOSE 8080
CMD ["npm", "start"] 
