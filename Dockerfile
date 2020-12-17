FROM node:12-alpine

USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY package-lock.json package.json ./ 

RUN npm install --silent
COPY . ./

CMD ["npm", "start"]