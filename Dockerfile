FROM node:20.10.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
RUN npm install -g @angular/cli@17.3.5
COPY . .
RUN ng build 
CMD ["npm", "start"]                   
