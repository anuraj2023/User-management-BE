FROM node:alpine
RUN mkdir -p /project/app
WORKDIR /project

COPY package.json ./
COPY server.js ./

RUN npm install 

COPY ./app/ ./app/



# EXPOSE 8080

CMD ["node","server.js"]