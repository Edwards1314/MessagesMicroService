FROM node:12

#Variables
ENV PORT 8080
ENV WDIR /usr

#create directory
RUN mkdir -p ${WDIR}
WORKDIR ${WDIR}

COPY package*.json .
RUN npm install
COPY . .

RUN npm run start

EXPOSE ${PORT}
CMD ["npm", "start"] 
