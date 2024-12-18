# Base Image
FROM node:23

# Create app directory
WORKDIR /home/victor-j-wilson/projects2/SchedulingApp/scheduling-app-server/

COPY . /home/victor-j-wilson/projects2/SchedulingApp/scheduling-app-server/

ENV NODE_ENV=development

RUN npm install 

RUN chown -Rh node:node /home/victor-j-wilson/projects2/SchedulingApp/scheduling-app-server

# Make port 3000 avaliable outside the application container
EXPOSE 3000

# npm start dev
CMD ["npm", "run", "start:dev"]

