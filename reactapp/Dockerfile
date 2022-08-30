# Step 1
FROM node:10-alpine as build-step
RUN mkdir /reactapp
WORKDIR /reactapp
COPY package.json /reactapp
RUN npm install
COPY . /reactapp
RUN npm run build

CMD ["npm", "start"]

