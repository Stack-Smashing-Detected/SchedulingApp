# Base Image
FROM node:latest

# Create app directory
WORKDIR /home/victor-j-wilson/projects2/SchedulingApp/scheduling-app-server

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]

