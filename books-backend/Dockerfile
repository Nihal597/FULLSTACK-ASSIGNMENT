FROM node:latest

# Setting up the work directory
WORKDIR /books-backend

# Copying all the files in our project
COPY package.json .

# # # Installing dependencies
RUN npm install

COPY . .

# Starting our application
CMD [ "node", "index.js" ]

# Exposing server port
EXPOSE 3000